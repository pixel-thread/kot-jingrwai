/*
  Warnings:

  - Made the column `userId` on table `Auth` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_authId_fkey";

-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
