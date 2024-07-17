/*
  Warnings:

  - You are about to drop the column `port` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "port",
ADD COLUMN     "size" "PetPort" NOT NULL DEFAULT 'SMALL';
