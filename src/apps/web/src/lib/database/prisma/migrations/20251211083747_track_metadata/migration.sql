/*
  Warnings:

  - You are about to drop the column `bucketId` on the `TrackMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `etag` on the `TrackMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `TrackMetadata` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[metadataId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trackId]` on the table `TrackMetadata` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `metadataId` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downloadUrl` to the `TrackMetadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullPath` to the `TrackMetadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `TrackMetadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supabaseId` to the `TrackMetadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TrackMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "metadataId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrackMetadata" DROP COLUMN "bucketId",
DROP COLUMN "etag",
DROP COLUMN "filePath",
ADD COLUMN     "downloadUrl" TEXT NOT NULL,
ADD COLUMN     "fullPath" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "supabaseId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "trackId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Track_metadataId_key" ON "Track"("metadataId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackMetadata_trackId_key" ON "TrackMetadata"("trackId");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "TrackMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
