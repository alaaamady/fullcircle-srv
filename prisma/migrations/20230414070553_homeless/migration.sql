-- CreateTable
CREATE TABLE "Homeless" (
    "id" SERIAL NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "confirmations" INTEGER NOT NULL,

    CONSTRAINT "Homeless_pkey" PRIMARY KEY ("id")
);
