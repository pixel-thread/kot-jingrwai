/*
  Warnings:

  - You are about to drop the column `addedBy` on the `BibleVerse` table. All the data in the column will be lost.
  - You are about to drop the column `random_verse_id` on the `BibleVerse` table. All the data in the column will be lost.
  - You are about to drop the column `translation_id` on the `BibleVerse` table. All the data in the column will be lost.
  - You are about to drop the `RandomVerse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[verseId]` on the table `BibleVerse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `verseId` to the `BibleVerse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BibleVerse" DROP CONSTRAINT "BibleVerse_addedBy_fkey";

-- DropForeignKey
ALTER TABLE "public"."BibleVerse" DROP CONSTRAINT "BibleVerse_random_verse_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."BibleVerse" DROP CONSTRAINT "BibleVerse_translation_id_fkey";

-- DropIndex
DROP INDEX "public"."BibleVerse_addedBy_idx";

-- AlterTable
ALTER TABLE "public"."BibleVerse" DROP COLUMN "addedBy",
DROP COLUMN "random_verse_id",
DROP COLUMN "translation_id",
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "verseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."RandomVerse";

-- DropTable
DROP TABLE "public"."Translation";

-- CreateTable
CREATE TABLE "public"."DetailsT" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "verseurl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetailsT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Verse" (
    "id" TEXT NOT NULL,
    "detailsId" TEXT NOT NULL,
    "notice" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DetailsT_id_idx" ON "public"."DetailsT"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Verse_detailsId_key" ON "public"."Verse"("detailsId");

-- CreateIndex
CREATE INDEX "Verse_id_idx" ON "public"."Verse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BibleVerse_verseId_key" ON "public"."BibleVerse"("verseId");

-- CreateIndex
CREATE INDEX "BibleVerse_id_idx" ON "public"."BibleVerse"("id");

-- AddForeignKey
ALTER TABLE "public"."Verse" ADD CONSTRAINT "Verse_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "public"."DetailsT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BibleVerse" ADD CONSTRAINT "BibleVerse_verseId_fkey" FOREIGN KEY ("verseId") REFERENCES "public"."Verse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BibleVerse" ADD CONSTRAINT "BibleVerse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
