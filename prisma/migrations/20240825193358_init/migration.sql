/*
  Warnings:

  - Added the required column `userId` to the `Information` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Information" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "informationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "note" TEXT,
    "cancellationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_informationId_key" ON "Appointment"("informationId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_informationId_fkey" FOREIGN KEY ("informationId") REFERENCES "Information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
