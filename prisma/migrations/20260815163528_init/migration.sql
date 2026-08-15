-- CreateTable
CREATE TABLE "Motorcycle" (
    "id" TEXT NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "engineNumber" TEXT NOT NULL,
    "chassisNumber" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerPhone" TEXT NOT NULL,
    "ownerEmail" TEXT,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastService" TIMESTAMP(3),
    "notes" TEXT,
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Motorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_plateNumber_key" ON "Motorcycle"("plateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_engineNumber_key" ON "Motorcycle"("engineNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_chassisNumber_key" ON "Motorcycle"("chassisNumber");

-- CreateIndex
CREATE INDEX "Motorcycle_plateNumber_idx" ON "Motorcycle"("plateNumber");

-- CreateIndex
CREATE INDEX "Motorcycle_engineNumber_idx" ON "Motorcycle"("engineNumber");
