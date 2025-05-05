/*
  Warnings:

  - You are about to alter the column `recurrent` on the `tags` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `tags` MODIFY `recurrent` ENUM('None', 'Daily', 'Weekly', 'Monthly', 'Yearly', 'Other') NOT NULL;
