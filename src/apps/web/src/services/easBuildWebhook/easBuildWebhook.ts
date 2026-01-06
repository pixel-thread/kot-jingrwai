import { prisma } from "@/lib/database/prisma";
import { $Enums, Prisma } from "@/lib/database/prisma/generated/prisma";
import { EasBuildPayload } from "@repo/types";

export async function upsertEASBuild(payload: EasBuildPayload) {
  const status: $Enums.EASBuildStatus = payload.status.toUpperCase() as $Enums.EASBuildStatus;
  const platform: $Enums.AppVersionPlatform =
    payload.platform.toUpperCase() as $Enums.AppVersionPlatform;

  const data: Prisma.EASBuildWebhookCreateInput = {
    buildId: payload.id,
    accountName: payload.accountName,
    projectName: payload.projectName,
    appId: payload.appId,
    platform: platform, // "android" | "ios"
    status: status, // "finished" | "errored" | "canceled"
    buildDetailsPageUrl: payload.buildDetailsPageUrl ?? null,

    buildUrl: payload.artifacts?.buildUrl ?? null,
    logsS3KeyPrefix: payload.artifacts?.logsS3KeyPrefix ?? null,

    appVersion: payload.metadata?.appVersion ?? null,
    appBuildVersion: payload.metadata?.appBuildVersion ?? null,
    buildProfile: payload.metadata?.buildProfile ?? null,
    distribution: payload.metadata?.distribution ?? null,
    runtimeVersion: payload.metadata?.runtimeVersion ?? null,
    channel: payload.metadata?.channel ?? null,
    gitCommitHash: payload.metadata?.gitCommitHash ?? null,
    gitCommitMessage: payload.metadata?.gitCommitMessage ?? null,

    createdAt: payload.createdAt ? new Date(payload.createdAt) : new Date(),
    enqueuedAt: payload.enqueuedAt ? new Date(payload.enqueuedAt) : null,
    completedAt: payload.completedAt ? new Date(payload.completedAt) : null,

    errorMessage: payload.error?.message ?? null,
    errorCode: payload.error?.errorCode ?? null,

    rawPayload: JSON.stringify(payload),
  };

  await prisma.eASBuildWebhook.upsert({
    where: { buildId: data.buildId },
    create: data,
    update: data,
  });
}
