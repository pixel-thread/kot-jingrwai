-- CreateEnum
CREATE TYPE "AppSource" AS ENUM ('LYNTI_BNENG', 'KOT_JINGRWAI');

-- AlterTable
ALTER TABLE "SongMetadata" ADD COLUMN     "source" "AppSource"[] DEFAULT ARRAY['KOT_JINGRWAI']::"AppSource"[];
