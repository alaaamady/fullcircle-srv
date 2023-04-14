-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('ORPHANAGE', 'HOMELESS_SHELTER', 'COMMUNITY_KITCHEN', 'FAMILY_IN_NEED', 'ANIMAL_SHELTER');

-- CreateTable
CREATE TABLE "Recipient" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "OrganizationType" NOT NULL,
    "pictures" TEXT[],
    "amountOfPeople" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipient" ADD CONSTRAINT "Recipient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
