-- CreateTable
CREATE TABLE "Information" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactNumber" TEXT NOT NULL,
    "primaryPhysician" TEXT NOT NULL,
    "insuranceProvider" TEXT NOT NULL,
    "insurancePolicyNumber" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "currentMedication" TEXT NOT NULL,
    "familyMedicalHistory" TEXT NOT NULL,
    "pastMedicalHistory" TEXT NOT NULL,
    "identificationType" TEXT NOT NULL,
    "identificationNumber" TEXT NOT NULL,
    "identificationDocument" TEXT,
    "privacyConsent" BOOLEAN NOT NULL,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
