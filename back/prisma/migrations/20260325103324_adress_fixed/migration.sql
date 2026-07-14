/*
  Warnings:

  - A unique constraint covering the columns `[profile_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `profile` MODIFY `adress_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_profile_id_key` ON `user`(`profile_id`);
