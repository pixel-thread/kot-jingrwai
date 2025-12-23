/*
  Warnings:

  - Added the required column `lastLoginAt` to the `DownloadUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DownloadUsers" ADD COLUMN     "lastLoginAt" TIMESTAMP(3) NOT NULL;
