/*
  Warnings:

  - You are about to drop the column `numReviews` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "numReviews",
ADD COLUMN     "numTestimonials" INTEGER NOT NULL DEFAULT 0;
