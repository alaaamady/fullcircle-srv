/*
  Warnings:

  - You are about to drop the column `pictures` on the `Recipient` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Recipient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_donationId_fkey";

-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "recipientId" INTEGER,
ALTER COLUMN "donationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Recipient" DROP COLUMN "pictures",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
