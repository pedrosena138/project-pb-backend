/*
  Warnings:

  - You are about to drop the column `profileId` on the `clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf_number` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg_number` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_profileId_fkey";

-- DropIndex
DROP INDEX "clients_profileId_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "profileId",
ADD COLUMN     "cpf_number" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "identity_file" TEXT,
ADD COLUMN     "profile_id" TEXT NOT NULL,
ADD COLUMN     "rg_number" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "clients_profile_id_key" ON "clients"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
