import { env } from "@/env";
import { supabase } from "@/lib/supabase";

type UploadFileProps = {
  file: File;
  path?: string;
};

async function uploadFile({ file, path = "tracks" }: UploadFileProps) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  return await supabase.storage
    .from(env.SUPABASE_BUCKET)
    .upload(filePath, Buffer.from(await file.arrayBuffer()), {
      contentType: file.type,
      upsert: true,
    });
}

export const UploadService = {
  async upload({ file }: UploadFileProps) {
    return await uploadFile({ file });
  },
};
