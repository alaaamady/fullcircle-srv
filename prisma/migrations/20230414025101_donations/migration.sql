/*
  Warnings:

  - You are about to drop the `Donation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Keystore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Keystore" DROP CONSTRAINT "Keystore_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_donationId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_userId_fkey";

-- DropTable
DROP TABLE "Donation";

-- DropTable
DROP TABLE "Keystore";

-- DropTable
DROP TABLE "Picture";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "FoodCategory";

-- DropEnum
DROP TYPE "RoleCode";
