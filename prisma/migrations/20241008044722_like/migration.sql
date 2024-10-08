/*
  Warnings:

  - A unique constraint covering the columns `[journalId,browserId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `browserId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "browserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_journalId_browserId_key" ON "Like"("journalId", "browserId");
