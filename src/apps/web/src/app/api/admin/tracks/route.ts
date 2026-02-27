import { TrackService } from "@/services/track";
import { sanitize } from "@/utils/helper/sanitize";
import { requiredRole } from "@/utils/middleware/requireRole";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { TracksRouteValidation } from "@/utils/validiation";
import { TracksResponseSchema } from "@repo/utils";

export const GET = withValidation(TracksRouteValidation, async ({ query }, req) => {
  const page = query.page;
  await requiredRole(req, "ADMIN");

  const tracks = await TrackService.getTracks({ page: page });

  return SuccessResponse({
    data: sanitize(TracksResponseSchema, tracks),
    message: "Tracks fetched successfully",
  });
});
