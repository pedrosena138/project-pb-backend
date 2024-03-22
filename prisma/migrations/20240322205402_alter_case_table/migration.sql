/*
  Warnings:

  - Added the required column `city` to the `cases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `cases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ocurrenceDate` to the `cases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `cases` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "ocurrenceDate" DATETIME NOT NULL,
    "documents" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "typeId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "lawyerId" TEXT,
    CONSTRAINT "cases_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "caseTypes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cases_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cases_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "lawyers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_cases" ("clientId", "createdAt", "description", "documents", "id", "lawyerId", "typeId", "updatedAt") SELECT "clientId", "createdAt", "description", "documents", "id", "lawyerId", "typeId", "updatedAt" FROM "cases";
DROP TABLE "cases";
ALTER TABLE "new_cases" RENAME TO "cases";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
