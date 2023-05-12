-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('GENERAL');

-- CreateEnum
CREATE TYPE "FoodCategory" AS ENUM ('GREENS', 'COOKED', 'GRAINS', 'DAIRY', 'FROZEN', 'GROCERIES');

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('ORPHANAGE', 'HOMELESS_SHELTER', 'COMMUNITY_KITCHEN', 'FAMILY_IN_NEED', 'ANIMAL_SHELTER');

-- CreateEnum
CREATE TYPE "Issues" AS ENUM ('BLOATED_CANS', 'UNSAFE_BAGS', 'STALE_BAKERY', 'ROTTEN_FRUITS_OR_VEGETABLES');

-- CreateEnum
CREATE TYPE "RoleCode" AS ENUM ('RECIPIENT', 'DRIVER', 'DONOR', 'ADMIN');

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "key" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "permissions" "Permission"[],
    "comments" TEXT[],
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "FoodCategory" NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "pickUpTimestampStart" TIMESTAMP(3) NOT NULL,
    "pickUpTimestampEnd" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "donationId" INTEGER NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

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
    "userId" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Homeless" (
    "id" SERIAL NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "confirmations" INTEGER NOT NULL,

    CONSTRAINT "Homeless_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipient" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "OrganizationType" NOT NULL,
    "pictures" TEXT[],
    "amountOfPeople" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverReview" (
    "id" SERIAL NOT NULL,
    "pickupConvenience" INTEGER NOT NULL,
    "donorDestination" INTEGER NOT NULL,
    "packaging" INTEGER NOT NULL,
    "additionalNotes" TEXT,
    "type" TEXT NOT NULL,
    "correctAddress" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "driverId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "donorId" TEXT NOT NULL,

    CONSTRAINT "DriverReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SafetyCheck" (
    "id" SERIAL NOT NULL,
    "expired" BOOLEAN NOT NULL,
    "leaking" BOOLEAN NOT NULL,
    "spoiled" BOOLEAN NOT NULL,
    "issues" "Issues"[],
    "cookedIsExpired" BOOLEAN,
    "cookedIsHot" BOOLEAN,
    "cookedIsSafe" BOOLEAN,
    "cookedIsLeaking" BOOLEAN,
    "cookedIsSpoiled" BOOLEAN,
    "verified" BOOLEAN NOT NULL,
    "additionalNotes" TEXT,
    "donationId" INTEGER NOT NULL,

    CONSTRAINT "SafetyCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "password" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "gender" TEXT,
    "age" INTEGER,
    "is_verified" BOOLEAN DEFAULT false,
    "profile_picture_url" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "SafetyCheck_donationId_key" ON "SafetyCheck"("donationId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipient" ADD CONSTRAINT "Recipient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverReview" ADD CONSTRAINT "DriverReview_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverReview" ADD CONSTRAINT "DriverReview_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverReview" ADD CONSTRAINT "DriverReview_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafetyCheck" ADD CONSTRAINT "SafetyCheck_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
