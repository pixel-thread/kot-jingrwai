/*
  Warnings:

  - You are about to drop the column `source` on the `SongPrayer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SongPrayer" DROP COLUMN "source",
ALTER COLUMN "isPaidBah" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "SongPrayer" ADD CONSTRAINT "SongPrayer_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
