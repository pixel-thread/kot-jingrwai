import { addLogs } from "@/services/logs/addLogs";
import { withValidation } from "@/utils/middleware/withValidiation";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { logger, LogSchema } from "@repo/utils";

export const POST = withValidation({ body: LogSchema }, async ({ body }) => {
  try {
    await addLogs({ data: body });
    return SuccessResponse({ message: "Log saved successfully" });
  } catch (error) {
    logger.error("Error saving log", { error });
    return ErrorResponse({
      message: "Internal Server error",
      status: 500,
    });
  }
});
