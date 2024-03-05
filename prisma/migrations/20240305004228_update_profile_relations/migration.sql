/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `lawyers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `lawyers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lawyers" ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lawyers_profileId_key" ON "lawyers"("profileId");

-- AddForeignKey
ALTER TABLE "lawyers" ADD CONSTRAINT "lawyers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
