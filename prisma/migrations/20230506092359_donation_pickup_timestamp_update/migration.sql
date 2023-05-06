/*
  Warnings:

  - You are about to drop the column `pickUpTimestamp` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `pickUpTimestampEnd` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpTimestampStart` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "pickUpTimestamp",
ADD COLUMN     "pickUpTimestampEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pickUpTimestampStart" TIMESTAMP(3) NOT NULL;
