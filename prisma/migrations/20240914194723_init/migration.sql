/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hospitalId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hospitalId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "phoneNumber",
ADD COLUMN     "hospitalId" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_hospitalId_key" ON "Doctor"("hospitalId");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
