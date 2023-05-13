-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "driverId" INTEGER,
ADD COLUMN     "recipientId" INTEGER;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
