/*
  Warnings:

  - You are about to drop the column `trackId` on the `Song` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_trackId_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "trackId";
