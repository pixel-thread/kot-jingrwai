import { TrackService } from "@/services/track";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { requiredRole } from "@/utils/middleware/requireRole";
import { withValidation } from "@/utils/middleware/withValidiation";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { TrackResponseSchema, UUIDSchema } from "@repo/utils";
import { logger } from "@repo/utils";
import z from "zod";

const routeSchema = {
  params: z.object({
    id: UUIDSchema,
  }),
};

export const DELETE = withValidation(routeSchema, async ({ params }, req) => {
  try {
    requiredRole(req, "SUPER_ADMIN");
    const id = params.id;

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
});
