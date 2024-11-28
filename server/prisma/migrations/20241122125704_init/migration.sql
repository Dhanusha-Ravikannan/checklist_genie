/*
  Warnings:

  - You are about to drop the column `responded_at` on the `checklist_item_response` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `checklist_item_response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checklist_item_response` DROP COLUMN `responded_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL;
