import { env } from "@/env";
import { supabase } from "@/lib/supabase";

type UploadFileProps = {
  file: File;
};
async function uploadFile({ file }: UploadFileProps) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `tracks/${fileName}`;
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
