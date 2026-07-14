-- CreateTable
CREATE TABLE `adress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(85) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `country` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artist_name` VARCHAR(45) NOT NULL,
    `is_coming` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artist_has_schedule` (
    `schedule_id` INTEGER NOT NULL,
    `artist_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_schedule_has_artist_artist1_idx`(`artist_id`),
    INDEX `fk_schedule_has_artist_schedule1_idx`(`schedule_id`),
    PRIMARY KEY (`schedule_id`, `artist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artist_has_stage` (
    `artist_id` INTEGER NOT NULL,
    `stage_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_artist_has_stage_artist1_idx`(`artist_id`),
    INDEX `fk_artist_has_stage_stage1_idx`(`stage_id`),
    PRIMARY KEY (`artist_id`, `stage_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `festival` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `adress_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_festival_adress1_idx`(`adress_id`),
    PRIMARY KEY (`id`, `adress_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `festival_has_artist` (
    `artist_id` INTEGER NOT NULL,
    `festival_id` INTEGER NOT NULL,
    `stage_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_artist_has_festival_artist1_idx`(`artist_id`),
    INDEX `fk_artist_has_festival_festival1_idx`(`festival_id`),
    INDEX `fk_artist_has_festival_stage1_idx`(`stage_id`),
    PRIMARY KEY (`artist_id`, `festival_id`, `stage_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `festival_has_stage` (
    `festival_id` INTEGER NOT NULL,
    `stage_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_festival_has_stage_festival1_idx`(`festival_id`),
    INDEX `fk_festival_has_stage_stage1_idx`(`stage_id`),
    PRIMARY KEY (`festival_id`, `stage_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inscription` (
    `mission_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_mission_has_user_mission1_idx`(`mission_id`),
    INDEX `fk_mission_has_user_user1_idx`(`user_id`),
    PRIMARY KEY (`mission_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `volunteer_needed` INTEGER NOT NULL,
    `description` LONGTEXT NOT NULL,
    `is_full` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `festival_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_mission_festival1_idx`(`festival_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission_has_schedule` (
    `schedule_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_schedule_has_mission_mission1_idx`(`mission_id`),
    INDEX `fk_schedule_has_mission_schedule1_idx`(`schedule_id`),
    PRIMARY KEY (`schedule_id`, `mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission_needs_skill` (
    `skills_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_skills_has_mission_mission1_idx`(`mission_id`),
    INDEX `fk_skills_has_mission_skills1_idx`(`skills_id`),
    PRIMARY KEY (`skills_id`, `mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_has_user` (
    `notification_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_notification_has_user_notification1_idx`(`notification_id`),
    INDEX `fk_notification_has_user_user1_idx`(`user_id`),
    PRIMARY KEY (`notification_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `firstname` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `birthdate` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `adress_id` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_profile_adress1_idx`(`adress_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time_start` TIMESTAMP(0) NOT NULL,
    `time_end` TIMESTAMP(0) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `name_UNIQUE`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills_has_user` (
    `skills_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_skills_has_user_skills1_idx`(`skills_id`),
    INDEX `fk_skills_has_user_user1_idx`(`user_id`),
    PRIMARY KEY (`skills_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stage_name` VARCHAR(45) NOT NULL,
    `is_free` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `is_validated` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `role` ENUM('organisateur', 'benevole') NOT NULL,
    `profile_id` INTEGER NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_user_profile1_idx`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_has_festival` (
    `user_id` INTEGER NOT NULL,
    `festival_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_user_has_festival_festival1_idx`(`festival_id`),
    INDEX `fk_user_has_festival_user1_idx`(`user_id`),
    PRIMARY KEY (`user_id`, `festival_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `artist_has_schedule` ADD CONSTRAINT `fk_schedule_has_artist_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `artist_has_schedule` ADD CONSTRAINT `fk_schedule_has_artist_schedule1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `artist_has_stage` ADD CONSTRAINT `fk_artist_has_stage_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `artist_has_stage` ADD CONSTRAINT `fk_artist_has_stage_stage1` FOREIGN KEY (`stage_id`) REFERENCES `stage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `festival` ADD CONSTRAINT `fk_festival_adress1` FOREIGN KEY (`adress_id`) REFERENCES `adress`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `festival_has_artist` ADD CONSTRAINT `fk_artist_has_festival_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `festival_has_artist` ADD CONSTRAINT `fk_artist_has_festival_festival1` FOREIGN KEY (`festival_id`) REFERENCES `festival`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `festival_has_artist` ADD CONSTRAINT `fk_artist_has_festival_stage1` FOREIGN KEY (`stage_id`) REFERENCES `stage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `festival_has_stage` ADD CONSTRAINT `fk_festival_has_stage_festival1` FOREIGN KEY (`festival_id`) REFERENCES `festival`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `festival_has_stage` ADD CONSTRAINT `fk_festival_has_stage_stage1` FOREIGN KEY (`stage_id`) REFERENCES `stage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inscription` ADD CONSTRAINT `fk_mission_has_user_mission1` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inscription` ADD CONSTRAINT `fk_mission_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `fk_mission_festival1` FOREIGN KEY (`festival_id`) REFERENCES `festival`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mission_has_schedule` ADD CONSTRAINT `fk_schedule_has_mission_mission1` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mission_has_schedule` ADD CONSTRAINT `fk_schedule_has_mission_schedule1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mission_needs_skill` ADD CONSTRAINT `fk_skills_has_mission_mission1` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mission_needs_skill` ADD CONSTRAINT `fk_skills_has_mission_skills1` FOREIGN KEY (`skills_id`) REFERENCES `skills`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notification_has_user` ADD CONSTRAINT `fk_notification_has_user_notification1` FOREIGN KEY (`notification_id`) REFERENCES `notification`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notification_has_user` ADD CONSTRAINT `fk_notification_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `fk_profile_adress1` FOREIGN KEY (`adress_id`) REFERENCES `adress`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `skills_has_user` ADD CONSTRAINT `fk_skills_has_user_skills1` FOREIGN KEY (`skills_id`) REFERENCES `skills`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `skills_has_user` ADD CONSTRAINT `fk_skills_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_profile1` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_has_festival` ADD CONSTRAINT `fk_user_has_festival_festival1` FOREIGN KEY (`festival_id`) REFERENCES `festival`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_has_festival` ADD CONSTRAINT `fk_user_has_festival_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
