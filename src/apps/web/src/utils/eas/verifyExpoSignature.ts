import { createHmac } from "crypto";

export function verifyExpoSignature(body: string, signature: string | null) {
  if (!signature) return false;
  const hmac = createHmac("sha1", process.env.EAS_WEBHOOK_SECRET!);
  hmac.update(body);
  const hash = `sha1=${hmac.digest("hex")}`;
  return signature === hash;
}
