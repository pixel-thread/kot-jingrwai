import { addLogs } from "@/services/logs/addLogs";
import { withValidation } from "@/utils/middleware/withValidiation";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { logger, LogSchema } from "@repo/utils";
import { NextRequest } from "next/server";
import { env } from "@/env";

export const POST = withValidation({ body: LogSchema }, async ({ body }, req: NextRequest) => {
  try {
    // 1. Basic Auth / API Key Check (Defense in Depth)
    const apiKey = req.headers.get("x-client-logger-key");

    if (apiKey !== env.NEXT_PUBLIC_CLIENT_LOGGER_KEY) {
      return ErrorResponse({ message: "Forbidden", status: 403 });
    }

    // 2. Identify connection properties server-side (prevent spoofing)
    const clientIp =
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      "unknown";

    // 3. Force override the log payload's timestamps and content to include real IP
    const safeLogData = {
      ...body,
      timestamp: new Date(),
      content: `[IP: ${clientIp}] ${body.content}`,
    };

    await addLogs({ data: safeLogData });
    return SuccessResponse({ message: "Log saved successfully" });
  } catch (error) {
    logger.error("Error saving log", { error });
    return ErrorResponse({
      message: "Internal Server error",
      status: 500,
    });
  }
});
