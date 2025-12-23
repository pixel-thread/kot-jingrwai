-- CreateEnum
CREATE TYPE "public"."EASBuildStatus" AS ENUM ('FINISHED', 'ERRORED', 'CANCELED');

-- CreateTable
CREATE TABLE "public"."EASBuildWebhook" (
    "id" UUID NOT NULL,
    "buildId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "platform" "public"."AppVersionPlatform" NOT NULL,
    "status" "public"."EASBuildStatus" NOT NULL,
    "buildDetailsPageUrl" TEXT,
    "buildUrl" TEXT,
    "logsS3KeyPrefix" TEXT,
    "appVersion" TEXT,
    "appBuildVersion" TEXT,
    "buildProfile" TEXT,
    "distribution" TEXT,
    "runtimeVersion" TEXT,
    "channel" TEXT,
    "gitCommitHash" TEXT,
    "gitCommitMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "enqueuedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "errorCode" TEXT,
    "rawPayload" JSONB NOT NULL,
    "appUpdateVersionId" UUID,

    CONSTRAINT "EASBuildWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EASBuildWebhook_buildId_key" ON "public"."EASBuildWebhook"("buildId");

-- CreateIndex
CREATE INDEX "EASBuildWebhook_platform_idx" ON "public"."EASBuildWebhook"("platform");

-- CreateIndex
CREATE INDEX "EASBuildWebhook_status_idx" ON "public"."EASBuildWebhook"("status");

-- CreateIndex
CREATE INDEX "EASBuildWebhook_completedAt_idx" ON "public"."EASBuildWebhook"("completedAt");

-- AddForeignKey
ALTER TABLE "public"."EASBuildWebhook" ADD CONSTRAINT "EASBuildWebhook_appUpdateVersionId_fkey" FOREIGN KEY ("appUpdateVersionId") REFERENCES "public"."AppVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
