-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organisation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organisation` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL,

    UNIQUE INDEX `Organisation_organisation_key`(`organisation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organisation_Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organisation_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `user_type` VARCHAR(191) NULL DEFAULT 'USER ',
    `user_position` VARCHAR(191) NULL DEFAULT 'DEVELOPER',
    `created_at` DATETIME(3) NULL,

    UNIQUE INDEX `Organisation_Users_organisation_id_user_id_key`(`organisation_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organisation_User_position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organisation_user_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `user_position` VARCHAR(191) NULL DEFAULT 'DEVELOPER',
    `created_at` DATETIME(3) NULL,

    UNIQUE INDEX `Organisation_User_position_organisation_user_id_user_id_key`(`organisation_user_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Organisation_Users` ADD CONSTRAINT `Organisation_Users_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisation_Users` ADD CONSTRAINT `Organisation_Users_organisation_id_fkey` FOREIGN KEY (`organisation_id`) REFERENCES `Organisation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisation_User_position` ADD CONSTRAINT `Organisation_User_position_organisation_user_id_fkey` FOREIGN KEY (`organisation_user_id`) REFERENCES `Organisation_Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisation_User_position` ADD CONSTRAINT `Organisation_User_position_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
