/*
  Warnings:

  - You are about to drop the column `hashPassowrd` on the `Auth` table. All the data in the column will be lost.
  - Added the required column `hashPassword` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "hashPassowrd",
ADD COLUMN     "hashPassword" TEXT NOT NULL;
