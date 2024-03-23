/*
  Warnings:

  - Added the required column `statusId` to the `cases` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CaseStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "lawyerId" TEXT,
    "typeId" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "ocurrenceDate" DATETIME NOT NULL,
    "documents" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "cases_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "caseTypes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cases_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "CaseStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cases_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cases_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "lawyers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_cases" ("city", "clientId", "company", "createdAt", "description", "documents", "id", "lawyerId", "ocurrenceDate", "state", "typeId", "updatedAt") SELECT "city", "clientId", "company", "createdAt", "description", "documents", "id", "lawyerId", "ocurrenceDate", "state", "typeId", "updatedAt" FROM "cases";
DROP TABLE "cases";
ALTER TABLE "new_cases" RENAME TO "cases";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
