/*
  Warnings:

  - A unique constraint covering the columns `[appUpdateVersionId]` on the table `EASBuildWebhook` will be added. If there are existing duplicate values, this will fail.
  - Made the column `appUpdateVersionId` on table `EASBuildWebhook` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."EASBuildWebhook" DROP CONSTRAINT "EASBuildWebhook_appUpdateVersionId_fkey";

-- DropIndex
DROP INDEX "public"."AppVersion_version_key";

-- AlterTable
ALTER TABLE "public"."AppVersion" ADD COLUMN     "buildNumber" TEXT,
ADD COLUMN     "easBuildWebhookId" TEXT,
ADD COLUMN     "runtimeVersion" TEXT,
ADD COLUMN     "versionCode" INTEGER;

-- AlterTable
ALTER TABLE "public"."EASBuildWebhook" ALTER COLUMN "appUpdateVersionId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EASBuildWebhook_appUpdateVersionId_key" ON "public"."EASBuildWebhook"("appUpdateVersionId");

-- AddForeignKey
ALTER TABLE "public"."EASBuildWebhook" ADD CONSTRAINT "EASBuildWebhook_appUpdateVersionId_fkey" FOREIGN KEY ("appUpdateVersionId") REFERENCES "public"."AppVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
