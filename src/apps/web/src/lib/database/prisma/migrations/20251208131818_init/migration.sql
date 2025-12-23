-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('SUPER_ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."AppVersionTags" AS ENUM ('BETA', 'STABLE', 'BUGFIX', 'PATCH');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageUrl" TEXT,
    "hasImage" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AppVersion" (
    "id" UUID NOT NULL,
    "version" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT[],
    "mandatory" BOOLEAN NOT NULL DEFAULT false,
    "platforms" TEXT[],
    "releaseNotesUrl" TEXT,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "minSupportedVersion" TEXT,
    "author" TEXT,
    "tags" "public"."AppVersionTags"[] DEFAULT ARRAY['STABLE']::"public"."AppVersionTags"[],
    "additionalInfo" JSONB,
    "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AppUser" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "versionId" UUID NOT NULL,
    "email" TEXT,
    "isDownload" BOOLEAN NOT NULL DEFAULT false,
    "lastUsedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DownloadUsers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "appVersionId" TEXT NOT NULL,
    "downloadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DownloadUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Translation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RandomVerse" (
    "id" TEXT NOT NULL,
    "book_id" TEXT,
    "book" TEXT,
    "chapter" INTEGER,
    "verse" INTEGER,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RandomVerse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BibleVerse" (
    "id" TEXT NOT NULL,
    "translation_id" TEXT,
    "random_verse_id" TEXT,
    "addedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BibleVerse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "public"."User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "public"."User"("id");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "public"."User"("name");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_email_key" ON "public"."User"("clerkId", "email");

-- CreateIndex
CREATE INDEX "AppVersion_version_idx" ON "public"."AppVersion"("version");

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_deviceId_key" ON "public"."AppUser"("deviceId");

-- CreateIndex
CREATE INDEX "AppUser_deviceId_idx" ON "public"."AppUser"("deviceId");

-- CreateIndex
CREATE INDEX "DownloadUsers_appVersionId_idx" ON "public"."DownloadUsers"("appVersionId");

-- CreateIndex
CREATE INDEX "DownloadUsers_email_idx" ON "public"."DownloadUsers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DownloadUsers_appVersionId_email_key" ON "public"."DownloadUsers"("appVersionId", "email");

-- CreateIndex
CREATE INDEX "BibleVerse_addedBy_idx" ON "public"."BibleVerse"("addedBy");

-- AddForeignKey
ALTER TABLE "public"."AppUser" ADD CONSTRAINT "AppUser_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "public"."AppVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BibleVerse" ADD CONSTRAINT "BibleVerse_translation_id_fkey" FOREIGN KEY ("translation_id") REFERENCES "public"."Translation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BibleVerse" ADD CONSTRAINT "BibleVerse_random_verse_id_fkey" FOREIGN KEY ("random_verse_id") REFERENCES "public"."RandomVerse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BibleVerse" ADD CONSTRAINT "BibleVerse_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
