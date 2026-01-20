import { getUniqueSongs } from "@/services/songs/getUniqueSong";
import { TrackService } from "@/services/track";
import { UploadService } from "@/services/uploads/indext";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { logger } from "@repo/utils";
import { NextRequest } from "next/server";
import z from "zod";

const schema = z.object({ file: z.instanceof(File) });

export async function POST(request: NextRequest) {
  try {
    // add header check for admin
    const header = request.headers.get("Authorization");

    if (header !== env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      return ErrorResponse({ error: "Unauthorized", status: 401 });
    }

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

    if (!songExist)
      return ErrorResponse({
        message: "Song does not exist",
        error: "Song not found",
        status: 404,
      });

    const fileExt = file.name.split(".").pop();
    const fileName = `${songExist.metadata.number}-${songExist.id}.${fileExt}`;
    const filePath = `tracks/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError, data } = await supabase.storage
      .from(env.SUPABASE_BUCKET)
      .upload(filePath, Buffer.from(await file.arrayBuffer()), {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      logger.error("SUPABASE Error: UPLOAD ERROR", { uploadError });
      return ErrorResponse({
        message: uploadError.message,
        error: uploadError,
        status: 500,
      });
    }

    const { data: url } = TrackService.getPublicUrl(data?.path);

    // Save metadata to database
    const trackMetadata = await prisma.trackMetadata.create({
      data: {
        supabaseId: data?.id,
        path: data.path,
        fileName: file.name,
        fullPath: data?.fullPath,
        downloadUrl: url.publicUrl,
        fileSize: file.size,
        mimeType: file.type,
      },
    });

    const track = await prisma.track.create({
      data: {
        songs: { connect: { id: songId } },
        metadata: { connect: { id: trackMetadata.id } },
      },
      include: { metadata: true },
    });

    await prisma.trackMetadata.update({
      where: { id: trackMetadata.id },
      data: { trackId: track.id },
    });

    logger.info("API:Track uploaded successfully", {
      songNo: songExist.metadata.number,
    });

    return SuccessResponse({ data: track });
  } catch (error) {
    return handleApiErrors(error);
  }
}
