/*
  Warnings:

  - You are about to drop the column `govermentSchems` on the `HospitalInformation` table. All the data in the column will be lost.
  - You are about to drop the column `insuranse` on the `HospitalInformation` table. All the data in the column will be lost.
  - You are about to drop the column `licenseNo` on the `HospitalInformation` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `HospitalInformation` table. All the data in the column will be lost.
  - Added the required column `governmentScheme` to the `HospitalInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalType` to the `HospitalInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license` to the `HospitalInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HospitalInformation" DROP COLUMN "govermentSchems",
DROP COLUMN "insuranse",
DROP COLUMN "licenseNo",
DROP COLUMN "type",
ADD COLUMN     "governmentScheme" TEXT NOT NULL,
ADD COLUMN     "hospitalType" TEXT NOT NULL,
ADD COLUMN     "license" TEXT NOT NULL;
