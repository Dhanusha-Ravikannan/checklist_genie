/*
  Warnings:

  - You are about to drop the column `boolean_input` on the `checklist_item_response` table. All the data in the column will be lost.
  - You are about to drop the column `input_type` on the `checklist_item_response` table. All the data in the column will be lost.
  - You are about to drop the column `number_input` on the `checklist_item_response` table. All the data in the column will be lost.
  - You are about to drop the column `text_input` on the `checklist_item_response` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `checklist_item_response` DROP COLUMN `boolean_input`,
    DROP COLUMN `input_type`,
    DROP COLUMN `number_input`,
    DROP COLUMN `text_input`;
