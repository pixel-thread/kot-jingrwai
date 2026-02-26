/*
  Warnings:

  - A unique constraint covering the columns `[number,isChorus]` on the table `SongMetadata` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Auth_id_idx";

-- DropIndex
DROP INDEX "BibleVerse_id_idx";

-- DropIndex
DROP INDEX "Details_id_idx";

-- DropIndex
DROP INDEX "Line_id_idx";

-- DropIndex
DROP INDEX "Song_id_idx";

-- DropIndex
DROP INDEX "SongMetadata_number_isChorus_id_key";

-- DropIndex
DROP INDEX "SongPrayer_id_idx";

-- DropIndex
DROP INDEX "User_id_idx";

-- DropIndex
DROP INDEX "Verse_id_idx";

-- CreateIndex
CREATE INDEX "BibleVerse_userId_idx" ON "BibleVerse"("userId");

-- CreateIndex
CREATE INDEX "BibleVerse_verseId_idx" ON "BibleVerse"("verseId");

-- CreateIndex
CREATE INDEX "BibleVerse_createdAt_idx" ON "BibleVerse"("createdAt");

-- CreateIndex
CREATE INDEX "Line_isPaidBah_idx" ON "Line"("isPaidBah");

-- CreateIndex
CREATE INDEX "Line_paragraphId_order_idx" ON "Line"("paragraphId", "order");

-- CreateIndex
CREATE INDEX "Log_timestamp_idx" ON "Log"("timestamp");

-- CreateIndex
CREATE INDEX "Paragraph_type_idx" ON "Paragraph"("type");

-- CreateIndex
CREATE INDEX "Paragraph_songId_order_idx" ON "Paragraph"("songId", "order");

-- CreateIndex
CREATE INDEX "Song_title_idx" ON "Song"("title");

-- CreateIndex
CREATE INDEX "Song_createdAt_idx" ON "Song"("createdAt");

-- CreateIndex
CREATE INDEX "SongMetadata_number_idx" ON "SongMetadata"("number");

-- CreateIndex
CREATE INDEX "SongMetadata_language_idx" ON "SongMetadata"("language");

-- CreateIndex
CREATE INDEX "SongMetadata_source_idx" ON "SongMetadata"("source");

-- CreateIndex
CREATE INDEX "SongMetadata_number_source_isChorus_idx" ON "SongMetadata"("number", "source", "isChorus");

-- CreateIndex
CREATE UNIQUE INDEX "SongMetadata_number_isChorus_key" ON "SongMetadata"("number", "isChorus");

-- CreateIndex
CREATE INDEX "Verse_createdAt_idx" ON "Verse"("createdAt");

-- CreateIndex
CREATE INDEX "Verse_detailsId_idx" ON "Verse"("detailsId");

-- CreateIndex
CREATE INDEX "Verse_detailsId_createdAt_idx" ON "Verse"("detailsId", "createdAt");
