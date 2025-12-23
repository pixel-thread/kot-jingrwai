import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { SuccessResponse } from "@/utils/next-response";
import { requiredAuthToken } from "@/utils/middleware/requiredAuthToken";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await requiredAuthToken(req);

    return SuccessResponse({
      data: user,
      message: "User verified (created if absent)",
    });
  } catch (err) {
    return handleApiErrors(err);
  }
}
