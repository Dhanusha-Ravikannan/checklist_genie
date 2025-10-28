/*
  Warnings:

  - Added the required column `assigned_by_user_id` to the `template_recipients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `template_recipients` ADD COLUMN `assigned_by_user_id` INTEGER NOT NULL,
    ADD COLUMN `cc_bcc_emails` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `template_recipients` ADD CONSTRAINT `template_recipients_assigned_by_user_id_fkey` FOREIGN KEY (`assigned_by_user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
