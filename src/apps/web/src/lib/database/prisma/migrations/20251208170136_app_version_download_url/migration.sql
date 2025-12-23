/*
  Warnings:

  - You are about to drop the column `mandatory` on the `AppVersion` table. All the data in the column will be lost.
  - The `platforms` column on the `AppVersion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."AppVersionType" AS ENUM ('PTA', 'OTA');

-- CreateEnum
CREATE TYPE "public"."AppVersionPlatform" AS ENUM ('ANDROID', 'IOS');

-- AlterTable
ALTER TABLE "public"."AppVersion" DROP COLUMN "mandatory",
ADD COLUMN     "downloadUrl" TEXT,
ADD COLUMN     "type" "public"."AppVersionType" NOT NULL DEFAULT 'PTA',
DROP COLUMN "platforms",
ADD COLUMN     "platforms" "public"."AppVersionPlatform"[] DEFAULT ARRAY['ANDROID', 'IOS']::"public"."AppVersionPlatform"[],
ALTER COLUMN "releaseDate" SET DEFAULT CURRENT_TIMESTAMP;
