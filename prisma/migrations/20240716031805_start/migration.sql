-- CreateEnum
CREATE TYPE "PetPort" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "port" "PetPort" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT
);

-- CreateTable
CREATE TABLE "Characteristics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CharacteristicsOnPet" (
    "id" TEXT NOT NULL,
    "characteristicsId" TEXT,
    "petId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_id_key" ON "Pet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Characteristics_id_key" ON "Characteristics"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Characteristics_name_key" ON "Characteristics"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CharacteristicsOnPet_id_key" ON "CharacteristicsOnPet"("id");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacteristicsOnPet" ADD CONSTRAINT "CharacteristicsOnPet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacteristicsOnPet" ADD CONSTRAINT "CharacteristicsOnPet_characteristicsId_fkey" FOREIGN KEY ("characteristicsId") REFERENCES "Characteristics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
