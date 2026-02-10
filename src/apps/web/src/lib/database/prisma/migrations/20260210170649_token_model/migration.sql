/*
  Warnings:

  - You are about to drop the column `auth_id` on the `otp` table. All the data in the column will be lost.
  - You are about to drop the column `is_revoked` on the `otp` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "otp" DROP CONSTRAINT "otp_auth_id_fkey";

-- AlterTable
ALTER TABLE "otp" DROP COLUMN "auth_id",
DROP COLUMN "is_revoked",
ADD COLUMN     "authId" TEXT,
ADD COLUMN     "isRevoked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_hash_key" ON "Token"("hash");

-- CreateIndex
CREATE INDEX "Token_userId_idx" ON "Token"("userId");

-- CreateIndex
CREATE INDEX "Token_authId_idx" ON "Token"("authId");

-- CreateIndex
CREATE INDEX "Token_expiresAt_idx" ON "Token"("expiresAt");

-- AddForeignKey
ALTER TABLE "otp" ADD CONSTRAINT "otp_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
