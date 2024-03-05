/*
  Warnings:

  - You are about to drop the `lawyer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "lawyer";

-- CreateTable
CREATE TABLE "lawyers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "lawyers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);
