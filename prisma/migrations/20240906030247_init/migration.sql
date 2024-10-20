-- CreateTable
CREATE TABLE "Hospital" (
    "id" SERIAL NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalInformation" (
    "id" SERIAL NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "licenseNo" TEXT NOT NULL,
    "insuranse" TEXT NOT NULL,
    "govermentSchems" TEXT NOT NULL,

    CONSTRAINT "HospitalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_email_key" ON "Hospital"("email");

-- CreateIndex
CREATE UNIQUE INDEX "HospitalInformation_hospitalId_key" ON "HospitalInformation"("hospitalId");

-- AddForeignKey
ALTER TABLE "HospitalInformation" ADD CONSTRAINT "HospitalInformation_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
