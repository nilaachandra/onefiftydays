/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Journal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Journal_slug_key" ON "Journal"("slug");
