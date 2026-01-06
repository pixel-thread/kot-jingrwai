import { getUniqueSongs } from "@/services/songs/getUniqueSong";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const song = await getUniqueSongs({ where: { id } });
    if (!song) {
      return ErrorResponse({ message: "Song not found", status: 404 });
    }
    return SuccessResponse({ data: song.track });
  } catch (error) {
    return handleApiErrors(error);
  }
}
