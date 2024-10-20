/*
  Warnings:

  - You are about to drop the column `license` on the `HospitalInformation` table. All the data in the column will be lost.
  - Added the required column `licenseNo` to the `HospitalInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HospitalInformation" DROP COLUMN "license",
ADD COLUMN     "licenseNo" TEXT NOT NULL;
