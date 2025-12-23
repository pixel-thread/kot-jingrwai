/*
  Warnings:

  - You are about to drop the `AppUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[text]` on the table `DetailsT` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `DetailsT` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."AppUser" DROP CONSTRAINT "AppUser_versionId_fkey";

-- DropTable
DROP TABLE "public"."AppUser";

-- CreateIndex
CREATE UNIQUE INDEX "DetailsT_text_key" ON "public"."DetailsT"("text");

-- CreateIndex
CREATE UNIQUE INDEX "DetailsT_reference_key" ON "public"."DetailsT"("reference");
