/*
  Warnings:

  - You are about to drop the column `is_coming` on the `artist` table. All the data in the column will be lost.
  - You are about to drop the `artist_has_schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mission_has_schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mission_needs_skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `show_duration` to the `artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_start` to the `artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_end` to the `mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_start` to the `mission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `artist_has_schedule` DROP FOREIGN KEY `fk_schedule_has_artist_artist1`;

-- DropForeignKey
ALTER TABLE `artist_has_schedule` DROP FOREIGN KEY `fk_schedule_has_artist_schedule1`;

-- DropForeignKey
ALTER TABLE `mission_has_schedule` DROP FOREIGN KEY `fk_schedule_has_mission_mission1`;

-- DropForeignKey
ALTER TABLE `mission_has_schedule` DROP FOREIGN KEY `fk_schedule_has_mission_schedule1`;

-- DropForeignKey
ALTER TABLE `mission_needs_skill` DROP FOREIGN KEY `fk_skills_has_mission_mission1`;

-- DropForeignKey
ALTER TABLE `mission_needs_skill` DROP FOREIGN KEY `fk_skills_has_mission_skills1`;

-- AlterTable
ALTER TABLE `artist` DROP COLUMN `is_coming`,
    ADD COLUMN `show_duration` INTEGER NOT NULL,
    ADD COLUMN `time_start` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `mission` ADD COLUMN `time_end` DATETIME(3) NOT NULL,
    ADD COLUMN `time_start` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `artist_has_schedule`;

-- DropTable
DROP TABLE `mission_has_schedule`;

-- DropTable
DROP TABLE `mission_needs_skill`;

-- DropTable
DROP TABLE `schedule`;
