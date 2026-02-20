import { getUniqueSongs } from "@/services/songs/getUniqueSong";
import { TrackService } from "@/services/track";
import { UploadService } from "@/services/uploads/indext";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { TrackResponseSchema } from "@/utils/validation/track";
import { logger } from "@repo/utils";
import { NextRequest } from "next/server";
import z from "zod";

const schema = z.object({ file: z.instanceof(File) });

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // @ts-ignore
    const file = formData.get("file") as File;

    // @ts-ignore
    const songId = formData.get("songId") as string;

    schema.parse({ file });

    if (!file) {
      return ErrorResponse({ error: "Missing required fields", status: 400 });
    }

    if (!songId) {
      return ErrorResponse({ error: "Missing required fields", status: 400 });
    }

    const songExist = await getUniqueSongs({ where: { id: songId } });

    if (!songExist) return ErrorResponse({ error: "Song not found", status: 404 });

    const { error: uploadError, data } = await UploadService.upload({ file });

    if (uploadError) {
      logger.error("SUPABASE Error: UPLOAD ERROR", { uploadError });
      return ErrorResponse({
        message: uploadError.message,
        error: uploadError,
        status: 500,
      });
    }

    const { data: url } = TrackService.getPublicUrl(data?.path);

    const track = await TrackService.createTrack({
      data: { songId },
      metadata: {
        supabaseId: data?.id,
        path: data.path,
        fileName: file.name,
        fullPath: data?.fullPath,
        downloadUrl: url.publicUrl,
        fileSize: file.size,
        mimeType: file.type,
      },
    });

    return SuccessResponse({
      data: sanitize(TrackResponseSchema, track),
      message: "Song uploaded successfully",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
