/*
  Warnings:

  - You are about to drop the column `documentBack` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `documentFront` on the `clients` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpfNumber" TEXT NOT NULL,
    "rgNumber" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "documentsPaths" TEXT,
    CONSTRAINT "clients_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clients" ("cpfNumber", "createdAt", "id", "name", "profileId", "rgNumber", "updatedAt") SELECT "cpfNumber", "createdAt", "id", "name", "profileId", "rgNumber", "updatedAt" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_profileId_key" ON "clients"("profileId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
