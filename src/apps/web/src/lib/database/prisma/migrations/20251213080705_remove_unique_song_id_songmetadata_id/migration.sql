/*
  Warnings:

  - A unique constraint covering the columns `[number,isChorus,id]` on the table `SongMetadata` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SongMetadata_number_isChorus_key";

-- CreateIndex
CREATE UNIQUE INDEX "SongMetadata_number_isChorus_id_key" ON "SongMetadata"("number", "isChorus", "id");
