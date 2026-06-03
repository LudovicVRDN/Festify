/*
  Warnings:

  - The primary key for the `festival` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[street,city,postalCode]` on the table `adress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `id_UNIQUE` ON `festival`;

-- AlterTable
ALTER TABLE `festival` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `mission` MODIFY `is_full` TINYINT NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `adress_street_city_postalCode_key` ON `adress`(`street`, `city`, `postalCode`);

-- CreateIndex
CREATE INDEX `festival_start_date_end_date_idx` ON `festival`(`start_date`, `end_date`);
