/*
  Warnings:

  - Made the column `user_position` on table `organisation_user_position` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `organisation_user_position` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `organisation_user_position` MODIFY `user_position` ENUM('DEVELOPER', 'POWER_BI', 'SALESFORCE', 'TESTER', 'GRAPHIC_DESIGNER') NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `organisation_users` ALTER COLUMN `user_position` DROP DEFAULT;
