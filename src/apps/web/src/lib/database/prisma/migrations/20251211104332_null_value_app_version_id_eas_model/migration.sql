/*
  Warnings:

  - Added the required column `updatedAt` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EASBuildWebhook" DROP CONSTRAINT "EASBuildWebhook_appUpdateVersionId_fkey";

-- AlterTable
ALTER TABLE "EASBuildWebhook" ALTER COLUMN "appUpdateVersionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Song_id_idx" ON "Song"("id");

-- CreateIndex
CREATE INDEX "Song_isChorus_idx" ON "Song"("isChorus");

-- CreateIndex
CREATE INDEX "Song_trackId_idx" ON "Song"("trackId");

-- AddForeignKey
ALTER TABLE "EASBuildWebhook" ADD CONSTRAINT "EASBuildWebhook_appUpdateVersionId_fkey" FOREIGN KEY ("appUpdateVersionId") REFERENCES "AppVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
