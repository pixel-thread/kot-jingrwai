import { TrackService } from "@/services/track";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredSuperAdminRole } from "@/utils/middleware/requiredSuperAdminRole";
import { SuccessResponse } from "@/utils/next-response";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await requiredSuperAdminRole(req);
    const tracks = await TrackService.getTracks();

    return SuccessResponse({
      data: tracks,
      message: "Tracks fetched successfully",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
