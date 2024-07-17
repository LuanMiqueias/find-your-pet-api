/*
  Warnings:

  - The `size` column on the `Pet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "size",
ADD COLUMN     "size" "PetSize" NOT NULL DEFAULT 'SMALL';

-- DropEnum
DROP TYPE "PetPort";
