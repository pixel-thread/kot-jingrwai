-- CreateEnum
CREATE TYPE "AttemptType" AS ENUM ('LOGIN', 'OTP', 'FORGOT_PASSWORD');

-- CreateEnum
CREATE TYPE "LockReason" AS ENUM ('TOO_MANY_FAILED_LOGIN_ATTEMPTS', 'TOO_MANY_FAILED_OTP_ATTEMPTS');

-- CreateTable
CREATE TABLE "Attempt" (
    "id" TEXT NOT NULL,
    "authId" TEXT,
    "email" TEXT,
    "ipAddress" TEXT,
    "type" "AttemptType" NOT NULL,
    "success" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountLock" (
    "id" TEXT NOT NULL,
    "authId" TEXT,
    "email" TEXT,
    "reason" "LockReason" NOT NULL,
    "lockedUntil" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountLock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AccountLock_authId_idx" ON "AccountLock"("authId");

-- CreateIndex
CREATE INDEX "AccountLock_email_idx" ON "AccountLock"("email");

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountLock" ADD CONSTRAINT "AccountLock_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
