-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag_name` VARCHAR(191) NOT NULL,
    `organisation_user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `recurrent` BOOLEAN NOT NULL DEFAULT false,
    `user_positon` ENUM('DEVELOPER', 'POWER_BI', 'SALESFORCE', 'TESTER', 'GRAPHIC_DESIGNER') NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklist_template` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `template_name` VARCHAR(191) NOT NULL,
    `repeating` BOOLEAN NOT NULL DEFAULT false,
    `tag_id` INTEGER NOT NULL,
    `priority` ENUM('HIGH', 'MEDIUM', 'LOW') NOT NULL,
    `organisation_user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `organisation_id` INTEGER NOT NULL,
    `current_version_id` INTEGER NOT NULL,
    `instructions` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklist_template_version` (
    `version_id` INTEGER NOT NULL AUTO_INCREMENT,
    `checklist_template_id` INTEGER NOT NULL,
    `organisation_user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`version_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklist_template_linked_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `template_version_id` INTEGER NOT NULL,
    `checklist_item_id` INTEGER NOT NULL,
    `created_at` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklist_template_owners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checklist_template_id` INTEGER NOT NULL,
    `organisation_user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_organisation_user_id_fkey` FOREIGN KEY (`organisation_user_id`) REFERENCES `Organisation_Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_template_version` ADD CONSTRAINT `checklist_template_version_checklist_template_id_fkey` FOREIGN KEY (`checklist_template_id`) REFERENCES `checklist_template`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_template_version` ADD CONSTRAINT `checklist_template_version_organisation_user_id_fkey` FOREIGN KEY (`organisation_user_id`) REFERENCES `Organisation_Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_template_linked_items` ADD CONSTRAINT `checklist_template_linked_items_template_version_id_fkey` FOREIGN KEY (`template_version_id`) REFERENCES `checklist_template_version`(`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
