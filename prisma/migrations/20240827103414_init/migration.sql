/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Information` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `disclosureConsent` to the `Information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `treatmentConsent` to the `Information` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Information" DROP CONSTRAINT "Information_id_fkey";

-- AlterTable
ALTER TABLE "Information" ADD COLUMN     "disclosureConsent" BOOLEAN NOT NULL,
ADD COLUMN     "treatmentConsent" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Information_userId_key" ON "Information"("userId");

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
