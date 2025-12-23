-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "trackId" TEXT;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;
