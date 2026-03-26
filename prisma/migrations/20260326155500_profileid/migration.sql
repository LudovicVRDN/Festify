/*
  Warnings:

  - You are about to drop the column `profile_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `fk_user_profile1`;

-- DropIndex
DROP INDEX `id_UNIQUE` ON `profile`;

-- DropIndex
DROP INDEX `fk_user_profile1_idx` ON `user`;

-- DropIndex
DROP INDEX `user_profile_id_key` ON `user`;

-- AlterTable
ALTER TABLE `profile` MODIFY `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `profile_id`;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_id_fkey` FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
