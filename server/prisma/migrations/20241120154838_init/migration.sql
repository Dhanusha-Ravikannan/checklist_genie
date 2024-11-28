-- CreateTable
CREATE TABLE `_checklist_itemsTochecklist_template` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_checklist_itemsTochecklist_template_AB_unique`(`A`, `B`),
    INDEX `_checklist_itemsTochecklist_template_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_checklist_itemsTochecklist_template` ADD CONSTRAINT `_checklist_itemsTochecklist_template_A_fkey` FOREIGN KEY (`A`) REFERENCES `checklist_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_checklist_itemsTochecklist_template` ADD CONSTRAINT `_checklist_itemsTochecklist_template_B_fkey` FOREIGN KEY (`B`) REFERENCES `checklist_template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
