-- AlterTable
ALTER TABLE `checklist_item_response` ADD COLUMN `boolean_input` BOOLEAN NULL,
    ADD COLUMN `input_type` VARCHAR(191) NULL,
    ADD COLUMN `number_input` INTEGER NULL,
    ADD COLUMN `text_input` VARCHAR(191) NULL;
