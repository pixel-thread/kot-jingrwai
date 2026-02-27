-- CreateEnum
CREATE TYPE "AttemptType" AS ENUM ('LOGIN', 'OTP', 'FORGOT_PASSWORD');

-- CreateEnum
CREATE TYPE "LockReason" AS ENUM ('TOO_MANY_FAILED_LOGIN_ATTEMPTS', 'TOO_MANY_FAILED_OTP_ATTEMPTS');

-- CreateEnum
CREATE TYPE "VerseType" AS ENUM ('VERSE', 'CHORUS', 'BRIDGE', 'INTRO', 'OUTRO');

-- CreateEnum
CREATE TYPE "TAGS" AS ENUM ('CHRISTMAS');

-- CreateEnum
CREATE TYPE "AppSource" AS ENUM ('LYNTI_BNENG', 'KOT_JINGRWAI');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "AppVersionTags" AS ENUM ('BETA', 'STABLE', 'BUGFIX', 'PATCH');

-- CreateEnum
CREATE TYPE "AppVersionType" AS ENUM ('PTA', 'OTA');

-- CreateEnum
CREATE TYPE "AppVersionPlatform" AS ENUM ('ANDROID', 'IOS');

-- CreateEnum
CREATE TYPE "EASBuildStatus" AS ENUM ('FINISHED', 'ERRORED', 'CANCELED');

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "authId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongPrayer" (
    "id" TEXT NOT NULL,
    "songId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SongPrayer_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "imageUrl" TEXT,
    "hasImage" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "authId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trackId" TEXT,
    "metadataId" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongMetadata" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "oldNumber" INTEGER,
    "source" "AppSource"[] DEFAULT ARRAY['KOT_JINGRWAI']::"AppSource"[],
    "language" TEXT NOT NULL,
    "author" TEXT,
    "isChorus" BOOLEAN NOT NULL DEFAULT false,
    "composer" TEXT,
    "tags" TEXT[],
    "syllables" TEXT,
    "reference" TEXT,
    "tune" TEXT,
    "meter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "songId" TEXT,

    CONSTRAINT "SongMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Line" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isPaidBah" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paragraphId" TEXT,
    "prayerId" TEXT,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paragraph" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "VerseType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "Paragraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "metadataId" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackMetadata" (
    "id" TEXT NOT NULL,
    "supabaseId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fullPath" TEXT NOT NULL,
    "downloadUrl" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trackId" TEXT,

    CONSTRAINT "TrackMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppVersion" (
    "id" UUID NOT NULL,
    "version" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT[],
    "type" "AppVersionType" NOT NULL DEFAULT 'PTA',
    "platforms" "AppVersionPlatform"[] DEFAULT ARRAY['ANDROID', 'IOS']::"AppVersionPlatform"[],
    "releaseNotesUrl" TEXT,
    "downloadUrl" TEXT,
    "releaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minSupportedVersion" TEXT,
    "author" TEXT,
    "tags" "AppVersionTags"[] DEFAULT ARRAY['STABLE']::"AppVersionTags"[],
    "additionalInfo" JSONB,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "versionCode" INTEGER,
    "buildNumber" TEXT,
    "runtimeVersion" TEXT,

    CONSTRAINT "AppVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EASBuildWebhook" (
    "id" UUID NOT NULL,
    "buildId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "platform" "AppVersionPlatform" NOT NULL,
    "status" "EASBuildStatus" NOT NULL,
    "buildDetailsPageUrl" TEXT,
    "buildUrl" TEXT,
    "logsS3KeyPrefix" TEXT,
    "appVersion" TEXT,
    "appBuildVersion" TEXT,
    "buildProfile" TEXT,
    "distribution" TEXT,
    "runtimeVersion" TEXT,
    "channel" TEXT,
    "gitCommitHash" TEXT,
    "gitCommitMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "enqueuedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "errorCode" TEXT,
    "rawPayload" JSONB NOT NULL,

    CONSTRAINT "EASBuildWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DownloadUsers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "appVersion" TEXT NOT NULL,
    "lastLoginAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DownloadUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Details" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "verseurl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verse" (
    "id" TEXT NOT NULL,
    "detailsId" TEXT NOT NULL,
    "notice" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BibleVerse" (
    "id" TEXT NOT NULL,
    "verseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "BibleVerse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isBackend" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");

-- CreateIndex
CREATE INDEX "SongPrayer_songId_idx" ON "SongPrayer"("songId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hash_key" ON "Token"("hash");

-- CreateIndex
CREATE INDEX "Token_userId_idx" ON "Token"("userId");

-- CreateIndex
CREATE INDEX "Token_authId_idx" ON "Token"("authId");

-- CreateIndex
CREATE INDEX "Token_expiresAt_idx" ON "Token"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Song_metadataId_key" ON "Song"("metadataId");

-- CreateIndex
CREATE INDEX "Song_trackId_idx" ON "Song"("trackId");

-- CreateIndex
CREATE INDEX "Song_title_idx" ON "Song"("title");

-- CreateIndex
CREATE INDEX "Song_createdAt_idx" ON "Song"("createdAt");

-- CreateIndex
CREATE INDEX "SongMetadata_isChorus_idx" ON "SongMetadata"("isChorus");

-- CreateIndex
CREATE INDEX "SongMetadata_number_idx" ON "SongMetadata"("number");

-- CreateIndex
CREATE INDEX "SongMetadata_language_idx" ON "SongMetadata"("language");

-- CreateIndex
CREATE INDEX "SongMetadata_source_idx" ON "SongMetadata"("source");

-- CreateIndex
CREATE INDEX "SongMetadata_number_source_isChorus_idx" ON "SongMetadata"("number", "source", "isChorus");

-- CreateIndex
CREATE INDEX "Line_paragraphId_idx" ON "Line"("paragraphId");

-- CreateIndex
CREATE INDEX "Line_text_idx" ON "Line"("text");

-- CreateIndex
CREATE INDEX "Line_isPaidBah_idx" ON "Line"("isPaidBah");

-- CreateIndex
CREATE INDEX "Line_paragraphId_order_idx" ON "Line"("paragraphId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Line_paragraphId_order_key" ON "Line"("paragraphId", "order");

-- CreateIndex
CREATE INDEX "Paragraph_type_idx" ON "Paragraph"("type");

-- CreateIndex
CREATE INDEX "Paragraph_songId_order_idx" ON "Paragraph"("songId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Track_metadataId_key" ON "Track"("metadataId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackMetadata_trackId_key" ON "TrackMetadata"("trackId");

-- CreateIndex
CREATE INDEX "AppVersion_version_idx" ON "AppVersion"("version");

-- CreateIndex
CREATE UNIQUE INDEX "EASBuildWebhook_buildId_key" ON "EASBuildWebhook"("buildId");

-- CreateIndex
CREATE INDEX "EASBuildWebhook_platform_idx" ON "EASBuildWebhook"("platform");

-- CreateIndex
CREATE INDEX "EASBuildWebhook_status_idx" ON "EASBuildWebhook"("status");

-- CreateIndex
CREATE INDEX "EASBuildWebhook_completedAt_idx" ON "EASBuildWebhook"("completedAt");

-- CreateIndex
CREATE UNIQUE INDEX "DownloadUsers_userId_key" ON "DownloadUsers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Details_text_key" ON "Details"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Details_reference_key" ON "Details"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Verse_detailsId_key" ON "Verse"("detailsId");

-- CreateIndex
CREATE INDEX "Verse_createdAt_idx" ON "Verse"("createdAt");

-- CreateIndex
CREATE INDEX "Verse_detailsId_idx" ON "Verse"("detailsId");

-- CreateIndex
CREATE INDEX "Verse_detailsId_createdAt_idx" ON "Verse"("detailsId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "BibleVerse_verseId_key" ON "BibleVerse"("verseId");

-- CreateIndex
CREATE INDEX "BibleVerse_userId_idx" ON "BibleVerse"("userId");

-- CreateIndex
CREATE INDEX "BibleVerse_verseId_idx" ON "BibleVerse"("verseId");

-- CreateIndex
CREATE INDEX "BibleVerse_createdAt_idx" ON "BibleVerse"("createdAt");

-- CreateIndex
CREATE INDEX "Log_isBackend_timestamp_idx" ON "Log"("isBackend", "timestamp");

-- CreateIndex
CREATE INDEX "Log_type_timestamp_idx" ON "Log"("type", "timestamp");

-- CreateIndex
CREATE INDEX "Log_timestamp_idx" ON "Log"("timestamp");

-- CreateIndex
CREATE INDEX "AccountLock_authId_idx" ON "AccountLock"("authId");

-- CreateIndex
CREATE INDEX "AccountLock_email_idx" ON "AccountLock"("email");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "otp" ADD CONSTRAINT "otp_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongPrayer" ADD CONSTRAINT "SongPrayer_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "SongMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_paragraphId_fkey" FOREIGN KEY ("paragraphId") REFERENCES "Paragraph"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_prayerId_fkey" FOREIGN KEY ("prayerId") REFERENCES "SongPrayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paragraph" ADD CONSTRAINT "Paragraph_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "TrackMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "Details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BibleVerse" ADD CONSTRAINT "BibleVerse_verseId_fkey" FOREIGN KEY ("verseId") REFERENCES "Verse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BibleVerse" ADD CONSTRAINT "BibleVerse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountLock" ADD CONSTRAINT "AccountLock_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
