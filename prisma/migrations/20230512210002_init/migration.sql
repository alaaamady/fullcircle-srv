-- CreateEnum
CREATE TYPE "ServingsCount" AS ENUM ('LESS_THAN_5', 'LESS_THAN_10', 'LESS_THAN_50', 'LESS_THAN_100', 'OTHER');

-- CreateTable
CREATE TABLE "RecipientReview" (
    "id" SERIAL NOT NULL,
    "deliveredWell" BOOLEAN NOT NULL,
    "additionalNotes" TEXT,
    "fitCategory" BOOLEAN NOT NULL,
    "preferredCategory" "FoodCategory" NOT NULL,
    "quantityEnough" BOOLEAN NOT NULL,
    "servingsCount" "ServingsCount" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "driverId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "donorId" TEXT NOT NULL,

    CONSTRAINT "RecipientReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonorReview" (
    "id" SERIAL NOT NULL,
    "safetyCheck" BOOLEAN NOT NULL,
    "additionalNotes" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "donorId" TEXT NOT NULL,

    CONSTRAINT "DonorReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecipientReview" ADD CONSTRAINT "RecipientReview_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipientReview" ADD CONSTRAINT "RecipientReview_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipientReview" ADD CONSTRAINT "RecipientReview_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonorReview" ADD CONSTRAINT "DonorReview_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonorReview" ADD CONSTRAINT "DonorReview_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonorReview" ADD CONSTRAINT "DonorReview_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
