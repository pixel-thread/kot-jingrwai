import { handleApiErrors } from "@src/utils/errors/handleApiErrors";
import { requireAuth } from "@/utils/middleware/requireAuth";
import { SuccessResponse } from "@src/utils/next-response";
import { NextRequest } from "next/server";
import { sanitize } from "@/utils/helper/sanitize";
import { MeAuthResponseSchema } from "@/utils/validation/auth";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);

    return SuccessResponse({
      data: sanitize(MeAuthResponseSchema, auth),
      message: "Successfully fetched user details",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
