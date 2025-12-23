/*
  Warnings:

  - You are about to drop the column `appVersionId` on the `DownloadUsers` table. All the data in the column will be lost.
  - You are about to drop the column `downloadedAt` on the `DownloadUsers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `DownloadUsers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `DownloadUsers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appVersion` to the `DownloadUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DownloadUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."DownloadUsers_appVersionId_email_key";

-- DropIndex
DROP INDEX "public"."DownloadUsers_appVersionId_idx";

-- DropIndex
DROP INDEX "public"."DownloadUsers_email_idx";

-- AlterTable
ALTER TABLE "public"."DownloadUsers" DROP COLUMN "appVersionId",
DROP COLUMN "downloadedAt",
DROP COLUMN "email",
ADD COLUMN     "appVersion" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DownloadUsers_userId_key" ON "public"."DownloadUsers"("userId");
