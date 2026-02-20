import { TrackService } from "@/services/track";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { requiredRole } from "@/utils/middleware/requireRole";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { TrackResponseSchema } from "@/utils/validation/track";
import { logger } from "@repo/utils";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requiredRole(request, "SUPER_ADMIN");
    const id = (await params).id;
    const isTrackExist = await TrackService.getUniqueTrack({ where: { id } });

    if (!isTrackExist) {
      logger.info("Track not found", { id });
      return ErrorResponse({
        message: "Track not found",
        status: 404,
      });
    }
    const track = await TrackService.deleteTrack({ id });

    return SuccessResponse({
      data: sanitize(TrackResponseSchema, track),
      message: "Track deleted successfully",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
