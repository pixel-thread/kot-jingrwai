/*
  Warnings:

  - You are about to drop the column `isChorus` on the `Song` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Song_isChorus_idx";

-- DropIndex
DROP INDEX "SongMetadata_songId_key";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "isChorus";

-- CreateIndex
CREATE INDEX "SongMetadata_isChorus_idx" ON "SongMetadata"("isChorus");
