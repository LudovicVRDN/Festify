/*
  Warnings:

  - Added the required column `postalCode` to the `adress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adress` ADD COLUMN `postalCode` VARCHAR(30) NOT NULL;
