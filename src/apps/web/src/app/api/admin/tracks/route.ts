import { TrackService } from "@/services/track";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { requiredSuperAdminRole } from "@/utils/middleware/requiredSuperAdminRole";
import { requiredRole } from "@/utils/middleware/requireRole";
import { SuccessResponse } from "@/utils/next-response";
import { TracksResponseSchema } from "@/utils/validation/track";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await requiredRole(req, "ADMIN");
    const tracks = await TrackService.getTracks();

    return SuccessResponse({
      data: sanitize(TracksResponseSchema, tracks),
      message: "Tracks fetched successfully",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
