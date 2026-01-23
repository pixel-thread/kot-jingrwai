import { env } from "@/env";
import { prisma } from "@/lib/database/prisma";
import { supabase } from "@/lib/supabase";
import { getUniqueSongs } from "@/services/songs/getUniqueSong";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
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

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `tracks/${fileName}`;

    // Upload to Supabase Storage
    console.log("Uploading Song To Supabase");

    const { error: uploadError, data } = await supabase.storage
      .from(env.SUPABASE_BUCKET)
      .upload(filePath, Buffer.from(await file.arrayBuffer()), {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      logger.error("SUPABASE UPLOAD ERROR", { uploadError });
      return ErrorResponse({
        message: uploadError.message,
        error: uploadError,
        status: uploadError.status || 500,
      });
    }

    const { data: url } = supabase.storage.from(env.SUPABASE_BUCKET).getPublicUrl(data?.path);

    const trackMetadata = await prisma.trackMetadata.create({
      data: {
        supabaseId: data?.id,
        path: filePath,
        fileName: file.name,
        fullPath: data?.path,
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

    return SuccessResponse({ data: track, message: "Song uploaded successfully" });
  } catch (error) {
    console.log("Error uploading song", { error });
    return handleApiErrors(error);
  }
}
