/*
  Warnings:

  - You are about to drop the `DetailsT` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Verse" DROP CONSTRAINT "Verse_detailsId_fkey";

-- DropTable
DROP TABLE "public"."DetailsT";

-- CreateTable
CREATE TABLE "public"."Details" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "verseurl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Details_text_key" ON "public"."Details"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Details_reference_key" ON "public"."Details"("reference");

-- CreateIndex
CREATE INDEX "Details_id_idx" ON "public"."Details"("id");

-- AddForeignKey
ALTER TABLE "public"."Verse" ADD CONSTRAINT "Verse_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "public"."Details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
