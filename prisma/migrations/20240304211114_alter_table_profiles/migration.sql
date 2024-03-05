/*
  Warnings:

  - Added the required column `last_login` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_login" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
