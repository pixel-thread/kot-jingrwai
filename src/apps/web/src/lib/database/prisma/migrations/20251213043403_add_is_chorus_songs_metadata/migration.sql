/*
  Warnings:

  - A unique constraint covering the columns `[number,isChorus]` on the table `SongMetadata` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SongMetadata" ADD COLUMN     "isChorus" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "SongMetadata_number_isChorus_key" ON "SongMetadata"("number", "isChorus");
