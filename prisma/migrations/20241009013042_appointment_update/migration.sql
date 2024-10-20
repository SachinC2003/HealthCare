/*
  Warnings:

  - You are about to drop the column `informationId` on the `Appointment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_informationId_fkey";

-- DropIndex
DROP INDEX "Appointment_informationId_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "informationId";
