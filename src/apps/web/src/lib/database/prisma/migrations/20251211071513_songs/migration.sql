-- CreateEnum
CREATE TYPE "VerseType" AS ENUM ('VERSE', 'CHORUS', 'BRIDGE', 'INTRO', 'OUTRO');

-- CreateEnum
CREATE TYPE "TAGS" AS ENUM ('CHRISTMAS');

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "trackId" TEXT,
    "title" TEXT NOT NULL,
    "isChorus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "metadataId" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongMetadata" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "oldNumber" INTEGER,
    "language" TEXT NOT NULL,
    "author" TEXT,
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
CREATE TABLE "Paragraph" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "lines" TEXT[],
    "type" "VerseType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "Paragraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackMetadata" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "bucketId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "etag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrackMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_metadataId_key" ON "Song"("metadataId");

-- CreateIndex
CREATE UNIQUE INDEX "SongMetadata_songId_key" ON "SongMetadata"("songId");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "SongMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paragraph" ADD CONSTRAINT "Paragraph_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
