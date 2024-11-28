/*
  Warnings:

  - Made the column `input_type` on table `checklist_items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `checklist_items` MODIFY `input_type` ENUM('Boolean', 'Numeric') NOT NULL;
