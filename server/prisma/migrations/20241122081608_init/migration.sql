/*
  Warnings:

  - You are about to alter the column `selected_date` on the `checklist_item_response` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `checklist_item_response` MODIFY `selected_date` DATETIME(3) NOT NULL;
