/*
  Warnings:

  - You are about to drop the `template_recipients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `template_recipients` DROP FOREIGN KEY `template_recipients_assigned_by_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `template_recipients` DROP FOREIGN KEY `template_recipients_checklist_template_id_fkey`;

-- DropTable
DROP TABLE `template_recipients`;

-- CreateTable
CREATE TABLE `TemplateRecipients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checklist_template_id` INTEGER NOT NULL,
    `recipient_email` VARCHAR(191) NOT NULL,
    `cc_bcc_emails` VARCHAR(191) NOT NULL,
    `assigned_by_user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TemplateRecipients` ADD CONSTRAINT `TemplateRecipients_checklist_template_id_fkey` FOREIGN KEY (`checklist_template_id`) REFERENCES `checklist_template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplateRecipients` ADD CONSTRAINT `TemplateRecipients_assigned_by_user_id_fkey` FOREIGN KEY (`assigned_by_user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
