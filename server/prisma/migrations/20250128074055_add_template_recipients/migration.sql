-- CreateTable
CREATE TABLE `template_recipients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checklist_template_id` INTEGER NOT NULL,
    `recipient_email` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `template_recipients` ADD CONSTRAINT `template_recipients_checklist_template_id_fkey` FOREIGN KEY (`checklist_template_id`) REFERENCES `checklist_template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
