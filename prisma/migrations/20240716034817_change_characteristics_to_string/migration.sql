/*
  Warnings:

  - You are about to drop the `Characteristics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CharacteristicsOnPet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CharacteristicsOnPet" DROP CONSTRAINT "CharacteristicsOnPet_characteristicsId_fkey";

-- DropForeignKey
ALTER TABLE "CharacteristicsOnPet" DROP CONSTRAINT "CharacteristicsOnPet_petId_fkey";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "characteristics" TEXT[];

-- DropTable
DROP TABLE "Characteristics";

-- DropTable
DROP TABLE "CharacteristicsOnPet";
