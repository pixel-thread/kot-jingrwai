import { getUniqueSongs } from "@/services/songs/getUniqueSong";
import { updateSong } from "@/services/songs/updateSong";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredSuperAdminRole } from "@/utils/middleware/requiredSuperAdminRole";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { SongSchema } from "@/utils/validation/songs";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await requiredSuperAdminRole(req);
    const body = SongSchema.parse(await req.json());
    const isSongExists = await getUniqueSongs({ where: { id: body.id } });

    if (!isSongExists) {
      return ErrorResponse({
        message: "Song does not exist",
        data: { isSongExists },
      });
    }

    const updatedSong = await updateSong({ data: body });

    return SuccessResponse({
      data: updatedSong,
      message: "Successfully updated song",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
