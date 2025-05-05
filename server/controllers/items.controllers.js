const express = require("express");
const { PrismaClient, inputType } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllItems = async (req, res) => {
  try {
    const getItems = await prisma.checklist_items.findMany();
    res.status(200).json(getItems);
  } catch (error) {
    console.log(error);
  }
};

const createItems = async (req, res) => {
  try {
    const {
      checklist_name,
      tag_id,
      Instructions,
      template_version_id,
      input_type,
    } = req.body;
    const { organisation_user_id, organisation_id } = req.user;

    const newItem = await prisma.checklist_items.create({
      data: {
        checklist_name,
        tag_id,
        organisation_user_id,
        organisation_id,
        Instructions,
        input_type,
      },
    });

    const templateVersion = await prisma.checklist_template_version.findFirst({
      where: {
        version_id: template_version_id,
      },
      orderBy: { created_at: "desc" },
    });

    const linkedItems = await prisma.checklist_template_linked_items.create({
      data: {
        template_version_id: templateVersion.version_id,
        checklist_item_id: newItem.id,
        created_at: new Date(),
      },
    });

    res.status(200).json({ newItem, linkedItems });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error creating checklist item." });
  }
};

// const getItemsByTemplate = async (req, res) => {
//   try {
//     const { tag_id, current_version_id } = req.params;

//     const linkedItems = await prisma.checklist_template_linked_items.findMany({
//       where: {
//         template_version_id: parseInt(current_version_id),
//       },
      
//     });

//     const checklistItemIds = linkedItems.map((item) => item.checklist_item_id);

//     const items = await prisma.checklist_items.findMany({
//       where: {
//         tag_id: parseInt(tag_id),
//         id: { in: checklistItemIds },
//       },
//     });


//     const linkedItemsMap = linkedItems.reduce((acc, item) => {
//       if (!acc[item.checklist_item_id]) {
//         acc[item.checklist_item_id] = [];
//       }
//       acc[item.checklist_item_id].push(item);
//       return acc;
//     }, {});

//     const mergedItems = items.map((item) => ({
//       ...item,
//       ChecklistTemplateLinkedItems: linkedItemsMap[item.id] || [], 
//     }));

//     res.status(200).json(mergedItems);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch checklist items." });
//   }
// };

const getItemsByTemplate = async (req, res) => {
  try {
    const { tag_id, current_version_id } = req.params;

    

    const parsedVersionId = Number(current_version_id);
    const parsedTagId = Number(tag_id);

    const linkedItems = await prisma.checklist_template_linked_items.findMany({
      where: {
        template_version_id: parsedVersionId,
      },
    });

    if (!linkedItems.length) {
      return res.status(404).json({ message: "No linked items found." });
    }

    const checklistItemIds = linkedItems.map((item) => item.checklist_item_id);

    const items = await prisma.checklist_items.findMany({
      where: {
        tag_id: parsedTagId,
        id: { in: checklistItemIds },
      },
    });

    const linkedItemsMap = linkedItems.reduce((acc, item) => {
      if (!acc[item.checklist_item_id]) {
        acc[item.checklist_item_id] = [];
      }
      acc[item.checklist_item_id].push(item);
      return acc;
    }, {});

    const mergedItems = items.map((item) => ({
      ...item,
      ChecklistTemplateLinkedItems: linkedItemsMap[item.id] || [],
    }));
    console.log("Template version :",mergedItems)

    res.status(200).json(mergedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch checklist items." });
  }
};



const addExtraItems = async (req, res) => {
  try {
    const { checklist_name, Instructions, input_type } =
      req.body;
      const {organisation_user_id,organisation_id} = req.user;
    const { tag_id, template_id } = req.params;

    const extraItem = await prisma.checklist_items.create({
      data: {
        checklist_name,
        organisation_user_id,
        tag_id: parseInt(tag_id),
        organisation_id,
        Instructions,
        input_type,
      }
    });

    const templateVersion = await prisma.checklist_template.findFirst({
      where: { id: parseInt(template_id) },
      orderBy: { created_at: "desc" },
    });

    if (!templateVersion) {
      return res.status(400).json({ error: "Template version not found" });
    }

    const linkedItems = await prisma.checklist_template_linked_items.findMany({
      where: { template_version_id: templateVersion.current_version_id },
    });

    const newVersionId = await prisma.checklist_template_version.create({
      data: {
        checklist_template_id: parseInt(template_id),
        created_at: new Date(),
        organisation_user_id:organisation_user_id
      },
    });

    const newLinkedItems = linkedItems.map((item) => ({
      template_version_id: newVersionId.version_id,
      checklist_item_id: item.checklist_item_id,
      created_at: new Date(),
    }));

    newLinkedItems.push({
      template_version_id: newVersionId.version_id,
      checklist_item_id: extraItem.id,
      created_at: new Date(),
    });

    await prisma.checklist_template_linked_items.createMany({
      data: newLinkedItems,
    });

    await prisma.checklist_template.update({
      where: { id: parseInt(template_id) },
      data: { current_version_id: newVersionId.version_id },
    });

    res.status(200).json({
      message: "New item and linked items created successfully",
      extraItem,
      templateVersion: newVersionId,
      linkedItems: newLinkedItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add extra items" });
  }
};

module.exports = {
  getAllItems,
  createItems,
  getItemsByTemplate,
  addExtraItems,
};
