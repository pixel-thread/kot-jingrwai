/*
  Warnings:

  - You are about to drop the column `lines` on the `Paragraph` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Paragraph" DROP COLUMN "lines";

-- CreateTable
CREATE TABLE "Line" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paragraphId" TEXT,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Line_paragraphId_idx" ON "Line"("paragraphId");

-- CreateIndex
CREATE INDEX "Line_text_idx" ON "Line"("text");

-- CreateIndex
CREATE INDEX "Line_id_idx" ON "Line"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Line_paragraphId_order_key" ON "Line"("paragraphId", "order");

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_paragraphId_fkey" FOREIGN KEY ("paragraphId") REFERENCES "Paragraph"("id") ON DELETE SET NULL ON UPDATE CASCADE;
