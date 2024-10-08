/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Journal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Journal_slug_key" ON "Journal"("slug");
