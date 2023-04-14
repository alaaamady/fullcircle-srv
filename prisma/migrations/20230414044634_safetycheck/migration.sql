-- CreateEnum
CREATE TYPE "Issues" AS ENUM ('BLOATED_CANS', 'UNSAFE_BAGS', 'STALE_BAKERY', 'ROTTEN_FRUITS_OR_VEGETABLES');

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

-- CreateIndex
CREATE UNIQUE INDEX "SafetyCheck_donationId_key" ON "SafetyCheck"("donationId");

-- AddForeignKey
ALTER TABLE "SafetyCheck" ADD CONSTRAINT "SafetyCheck_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
