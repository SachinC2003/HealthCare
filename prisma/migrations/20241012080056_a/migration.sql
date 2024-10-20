-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "schedule" DROP NOT NULL,
ALTER COLUMN "reason" DROP NOT NULL,
ALTER COLUMN "primaryPhysician" DROP NOT NULL;
