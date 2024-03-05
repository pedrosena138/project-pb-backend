-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "last_login" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_profileId_key" ON "clients"("profileId");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
