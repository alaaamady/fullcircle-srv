-- CreateEnum
CREATE TYPE "FoodCategory" AS ENUM ('GREENS', 'COOKED', 'GRAINS', 'DAIRY', 'FROZEN', 'GROCERIES');

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "FoodCategory" NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "pickUpTimestamp" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "donationId" INTEGER NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
