import { SongService } from "@/services/songs";
import { updateSong } from "@/services/songs/updateSong";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { requiredRole } from "@/utils/middleware/requireRole";
import { withValidation } from "@/utils/middleware/withValidiation";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { SongResponseSchema } from "@/utils/validation/songs";
import { SongSchema } from "@repo/utils";
import { NextRequest } from "next/server";
import z from "zod";

const routeSchema = {
  body: SongSchema.required(),
  params: z.object({ id: z.uuid() }),
};

export const PUT = withValidation(routeSchema, async ({ body, params }, req: NextRequest) => {
  try {
    await requiredRole(req, "ADMIN");

    const isSongExists = await SongService.findUnique({ where: { id: params.id } });

    if (!isSongExists) {
      return ErrorResponse({
        message: "Song does not exist",
        data: { isSongExists },
      });
    }

    const updatedSong = await updateSong({ data: body });

    return SuccessResponse({
      data: sanitize(SongResponseSchema, updatedSong),
      message: "Successfully updated song",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
});
