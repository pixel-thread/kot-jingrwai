/*
  Warnings:

  - A unique constraint covering the columns `[version]` on the table `AppVersion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AppVersion_version_key" ON "public"."AppVersion"("version");
