/*
  Warnings:

  - You are about to drop the column `easBuildWebhookId` on the `AppVersion` table. All the data in the column will be lost.
  - You are about to drop the column `appUpdateVersionId` on the `EASBuildWebhook` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EASBuildWebhook" DROP CONSTRAINT "EASBuildWebhook_appUpdateVersionId_fkey";

-- DropIndex
DROP INDEX "EASBuildWebhook_appUpdateVersionId_key";

-- AlterTable
ALTER TABLE "AppVersion" DROP COLUMN "easBuildWebhookId";

-- AlterTable
ALTER TABLE "EASBuildWebhook" DROP COLUMN "appUpdateVersionId";
