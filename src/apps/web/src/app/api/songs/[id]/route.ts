import { getUniqueSongs } from "@/services/songs/getUniqueSong";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { withValidation } from "@/utils/middleware/withValidiation";
import { SuccessResponse } from "@/utils/next-response";
import { SongResponseSchema } from "@/utils/validation/songs";
import z from "zod";

const RouteSchema = {
  params: z.object({ id: z.uuid() }),
};

export const GET = withValidation(RouteSchema, async ({ params }) => {
  try {
    const id = params.id;

    const song = await getUniqueSongs({ where: { id } });

    return SuccessResponse({
      data: sanitize(SongResponseSchema, song),
      message: "Successfully fetched song",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
