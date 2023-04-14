-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "carType" TEXT NOT NULL,
    "carMake" TEXT NOT NULL,
    "carModel" TEXT NOT NULL,
    "manufactureYear" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "registrationCertificate" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "photos" TEXT[],
    "vehicleInspictionReport" TEXT NOT NULL,
    "driverLicense" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
