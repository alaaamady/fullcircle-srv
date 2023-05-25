/*
  Warnings:

  - You are about to drop the column `verified` on the `Driver` table. All the data in the column will be lost.
  - Added the required column `comments` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('verified', 'pending', 'rejected');

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "verified",
ADD COLUMN     "comments" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL;
