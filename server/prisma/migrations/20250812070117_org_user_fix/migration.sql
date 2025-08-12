-- DropForeignKey
ALTER TABLE `TemplateRecipients` DROP FOREIGN KEY `TemplateRecipients_assigned_by_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `TemplateRecipients` ADD CONSTRAINT `TemplateRecipients_assigned_by_user_id_fkey` FOREIGN KEY (`assigned_by_user_id`) REFERENCES `Organisation_Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
