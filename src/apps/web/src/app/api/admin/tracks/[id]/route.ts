import { TrackService } from "@/services/track";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { logger } from "@repo/utils";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    return SuccessResponse({ data: track, message: "Track deleted successfully" });
  } catch (error) {
    return handleApiErrors(error);
  }
}
