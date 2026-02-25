import { getUniqueSongs } from "@/services/songs/getUniqueSong";
import { TrackService } from "@/services/track";
import { UploadService } from "@/services/uploads/indext";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { sanitize } from "@/utils/helper/sanitize";
import { requiredRole } from "@/utils/middleware/requireRole";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { TrackResponseSchema } from "@repo/utils";
import { logger } from "@repo/utils";
import { NextRequest } from "next/server";
import z from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ACCEPTED_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/ogg"];

const schema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size limit is 10MB")
    .refine(
      (file) => ACCEPTED_AUDIO_TYPES.includes(file.type),
      "Only .mp3, .wav, or .ogg formats are supported."
    ),
  songId: z.uuid("Invalid Song ID structure")
});

export async function POST(request: NextRequest) {
  try {
    await requiredRole(request, "ADMIN")
    const formData = await request.formData();

    // @ts-ignore
    const file = formData.get("file") as File;

    // @ts-ignore
    const songId = formData.get("songId") as string;

    schema.parse({ file, songId });

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
      logger.error("SUPABASE Error: UPLOAD ERROR", uploadError);
      return ErrorResponse({
        message: uploadError.message,
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
