/*
  Warnings:

  - You are about to drop the column `city` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CEP` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('DOG', 'CAT', 'OTHER');

-- CreateEnum
CREATE TYPE "PetLevels" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "levelOfIndependence" "PetLevels" NOT NULL DEFAULT 'LOW',
ADD COLUMN     "powerlevel" "PetLevels" NOT NULL DEFAULT 'LOW',
ADD COLUMN     "requirementsForAdoption" TEXT[],
ADD COLUMN     "type" "PetType" NOT NULL DEFAULT 'DOG',
ALTER COLUMN "port" SET DEFAULT 'SMALL';

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "city",
ADD COLUMN     "CEP" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
