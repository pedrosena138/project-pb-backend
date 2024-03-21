/*
  Warnings:

  - Added the required column `oabId` to the `lawyers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `office` to the `lawyers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lawyers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "oabId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    CONSTRAINT "lawyers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_lawyers" ("id", "name", "profileId") SELECT "id", "name", "profileId" FROM "lawyers";
DROP TABLE "lawyers";
ALTER TABLE "new_lawyers" RENAME TO "lawyers";
CREATE UNIQUE INDEX "lawyers_profileId_key" ON "lawyers"("profileId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
