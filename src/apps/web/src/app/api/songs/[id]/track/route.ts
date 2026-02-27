import { getUniqueSongs } from "@/services/songs/getUniqueSong";
import { sanitize } from "@/utils/helper/sanitize";
import { withValidation } from "@/utils/middleware/withValidiation";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { TrackResponseSchema, UUIDSchema } from "@repo/utils";
import z from "zod";

const RouteSchema = {
  params: z.object({ id: UUIDSchema }),
};

export const GET = withValidation(RouteSchema, async ({ params }) => {
  const id = params.id;

  const song = await getUniqueSongs({ where: { id } });

  if (!song) {
    return ErrorResponse({ message: "Song not found", status: 404 });
  }

  return SuccessResponse({
    data: sanitize(TrackResponseSchema.nullable(), song.track),
    message: "Successfully fetched song track",
  });
});
