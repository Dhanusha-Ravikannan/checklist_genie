/*
  Warnings:

  - Added the required column `selected_date` to the `checklist_item_response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checklist_item_response` ADD COLUMN `selected_date` DATETIME(3) NOT NULL;
