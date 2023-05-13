/*
  Warnings:

  - You are about to drop the `ApiKey` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `area` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "area" TEXT NOT NULL;

-- DropTable
DROP TABLE "ApiKey";

-- DropEnum
DROP TYPE "Permission";
