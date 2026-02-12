-- CreateTable
CREATE TABLE "SongPrayer" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isPaidBah" BOOLEAN NOT NULL,
    "source" "AppSource" NOT NULL DEFAULT 'KOT_JINGRWAI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SongPrayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SongPrayer_songId_idx" ON "SongPrayer"("songId");

-- CreateIndex
CREATE INDEX "SongPrayer_id_idx" ON "SongPrayer"("id");
