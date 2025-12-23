import { prisma } from "@/lib/database/prisma";
import { AppVersionPlatform } from "@/lib/database/prisma/generated/prisma";
import { EasBuildPayload } from "@/types/eas/easBuild";

export async function promoteToAppVersion(payload: EasBuildPayload) {
  const isProduction = payload.metadata?.channel === "production";
  const isStatusFinished = payload.status === "finished";

  if (!isProduction || !isStatusFinished) return;

  const version =
    payload.metadata?.runtimeVersion || payload.metadata?.appVersion;

  if (!version) return;

  const title =
    payload.metadata?.gitCommitMessage.split(/\r?\n/)[0] || `Build ${version}`;

  const platform: AppVersionPlatform[] =
    payload.platform === "android" ? ["ANDROID"] : ["IOS"];

  const description: string[] = payload.metadata?.gitCommitMessage
    ? payload.metadata.gitCommitMessage.split(/\r?\n/).filter(Boolean)
    : [];

  await prisma.appVersion.create({
    data: {
      version,
      title,
      description: description,
      type: "OTA", // or derive from profile/channel
      platforms: platform,
      releaseNotesUrl: payload.buildDetailsPageUrl,
      downloadUrl: payload.artifacts?.buildUrl ?? null,
      minSupportedVersion: "1.0.0",
      status: isProduction ? "ACTIVE" : "INACTIVE",
      author: payload.metadata?.username ?? null,
      tags: ["STABLE"],
      buildNumber: payload.metadata.appVersion ?? null,
      runtimeVersion: payload.metadata.runtimeVersion ?? null,
      versionCode: parseInt(payload.metadata?.appVersion) ?? null,
      additionalInfo: {
        buildId: payload.id,
        channel: payload.metadata?.channel,
        profile: payload.metadata?.buildProfile,
      },
    },
  });
}
