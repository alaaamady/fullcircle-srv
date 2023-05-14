-- CreateTable
CREATE TABLE "Preference" (
    "id" SERIAL NOT NULL,
    "mealType" TEXT NOT NULL,
    "preferences" TEXT[],
    "recipientId" INTEGER,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preference_recipientId_key" ON "Preference"("recipientId");

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
