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

-- CreateIndex
CREATE INDEX "Log_isBackend_timestamp_idx" ON "Log"("isBackend", "timestamp");

-- CreateIndex
CREATE INDEX "Log_type_timestamp_idx" ON "Log"("type", "timestamp");
