/*
  Warnings:

  - Added the required column `phoneNumber` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpfNumber" TEXT NOT NULL,
    "rgNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "documentsPaths" TEXT,
    CONSTRAINT "clients_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clients" ("cpfNumber", "createdAt", "documentsPaths", "id", "name", "profileId", "rgNumber", "updatedAt") SELECT "cpfNumber", "createdAt", "documentsPaths", "id", "name", "profileId", "rgNumber", "updatedAt" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_profileId_key" ON "clients"("profileId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
