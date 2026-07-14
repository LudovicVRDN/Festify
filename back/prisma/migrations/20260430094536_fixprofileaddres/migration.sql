/*
  Warnings:

  - You are about to drop the column `country` on the `adress` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `adress` DROP COLUMN `country`;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `birthdate`;
