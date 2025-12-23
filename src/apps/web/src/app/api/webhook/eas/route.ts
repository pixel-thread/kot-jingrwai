import { NextRequest } from "next/server";
import { ErrorResponse, SuccessResponse } from "@/utils/next-response";
import { EasBuildPayload } from "@/types/eas/easBuild";
import { verifyExpoSignature } from "@/utils/eas/verifyExpoSignature";
import { promoteToAppVersion } from "@/services/appVersion/promoteToAppVersion";
import { upsertEASBuild } from "@/services/easBuildWebhook/easBuildWebhook";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("expo-signature");
    const body = await req.text();

    const valid = verifyExpoSignature(body, signature);
    if (!valid) {
      return ErrorResponse({
        error: "EAS signature error",
        status: 401,
        message: "Invalid signature",
      });
    }

    let payload: EasBuildPayload;

    try {
      payload = JSON.parse(body);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
      });
    }

    await upsertEASBuild(payload);

    await promoteToAppVersion(payload);

    return SuccessResponse({
      data: "Webhook received",
      status: 200,
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
