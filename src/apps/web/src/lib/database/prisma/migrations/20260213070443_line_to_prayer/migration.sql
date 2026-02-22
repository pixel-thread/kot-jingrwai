/*
  Warnings:

  - You are about to drop the column `isPaidBah` on the `SongPrayer` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `SongPrayer` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `SongPrayer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SongPrayer" DROP CONSTRAINT "SongPrayer_songId_fkey";

-- AlterTable
ALTER TABLE "Line" ADD COLUMN     "isPaidBah" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prayerId" TEXT;

-- AlterTable
ALTER TABLE "SongPrayer" DROP COLUMN "isPaidBah",
DROP COLUMN "order",
DROP COLUMN "value",
ALTER COLUMN "songId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SongPrayer" ADD CONSTRAINT "SongPrayer_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_prayerId_fkey" FOREIGN KEY ("prayerId") REFERENCES "SongPrayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
