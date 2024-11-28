const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllItems = async (req, res) => {
  try {
    const getItems = await prisma.checklist_items.findMany();
    res.status(200).json(getItems);
  } catch (error) {
    console.log(error);
  }
};

// const createItems = async (req, res) => {
//   try {
//     const { checklist_name, tag_id, Instructions, template_version_id } =
//       req.body;
//     const { organisation_user_id, organisation_id } = req.user;

//     const newItem = await prisma.checklist_items.create({
//       data: {
//         checklist_name,
//         tag_id,
//         organisation_user_id,
//         organisation_id,
//         Instructions,
//       },
//     });

//     const templateVersion = await prisma.checklist_template_version.findFirst({
//       where: {
//         version_id: template_version_id,
//       },
//       orderBy: { created_at: "desc" },
//     });

//     const linkedItems = await prisma.checklist_template_linked_items.create({
//       data: {
//         template_version_id: templateVersion.version_id,
//         checklist_item_id: newItem.id,
//         created_at: new Date(),
//       },
//     });
//     res.status(200).json({ newItem, linkedItems });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: "error in " });
//   }
// };

const createItems = async (req, res) => {
  try {
    const { checklist_name, tag_id, Instructions, template_version_id , input_type} =
      req.body;
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

const getItemsByTemplate = async (req, res) => {
  try {
    const {tag_id} = req.params;

    const items = await prisma.checklist_items.findMany({
      where: {
        tag_id : parseInt(tag_id)
      },
    });

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch checklist items.'});
  }
};

const saveOrUpdateChecklistResponse = async (req, res) => {
  try {
    const { organisation_user_id, checklist_item_id, response_data } = req.body;

    const checklistTemplateLinkedItem = await prisma.checklist_template_linked_items.findFirst({
      where: {
        checklist_item_id: checklist_item_id,
        ChecklistTemplateVersion: {
          organisation_user_id: organisation_user_id, 
        },
      },
    });

    const checklistTemplate = await prisma.checklist_template_version.findFirst({
      where: {
        organisation_user_id
      },
    });

    console.log("ssssssssssssssssss", checklistTemplate.checklist_template_id)

    if (!checklistTemplateLinkedItem) {
      return res.status(404).json({ message: 'Checklist item not found for this user or organisation.' });
    }

    const existingResponse = await prisma.checklist_item_response.findFirst({
      where: {
        organisation_user_id: organisation_user_id,
        checklist_template_linked_items_id: checklistTemplateLinkedItem.id,
        responded_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)), 
          lt: new Date(new Date().setHours(23, 59, 59, 999)), 
        },
      },
    });

    if (existingResponse) {
      const updatedResponse = await prisma.checklist_item_response.update({
        where: { id: existingResponse.id },
        data: {
          ...response_data,
          status: true,
          responded_at: new Date(),
        },
      });

      return res.status(200).json(updatedResponse);
    }

    const newResponse = await prisma.checklist_item_response.create({
      data: {
        status: false, 
        comments: response_data.comments,
        organisation_user_id: organisation_user_id,
        checklist_template_linked_items_id: checklistTemplateLinkedItem.id,
        user_assigned_checklist_template_id: checklistTemplate.checklist_template_id,
        template_version: checklistTemplateLinkedItem.checklist_template_version,
        responded_at: new Date(),
        ...response_data, 
      },
    });

    return res.status(201).json(newResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to save or update checklist item response.' });
  }
};


const getChecklistItemsForToday = async (req, res) => {
  try {
    const { organisation_user_id } = req.user;

    const currentDate = new Date();
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0)); 
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999)); 

    const items = await prisma.checklist_item_response.findMany({
      where: {
        organisation_user_id: organisation_user_id,
        status: false,
        responded_at: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        ChecklistTemplateLinkedItems: {
          include: {
            ChecklistItems: true, 
          },
        },
      },
    });

    const formattedItems = items.map((response) => ({
      item_id: response.ChecklistTemplateLinkedItems.ChecklistItems.id,
      item_name: response.ChecklistTemplateLinkedItems.ChecklistItems.checklist_name,
      status: response.status,
      responded_at: response.responded_at,
      comments: response.comments,
    }));

    res.status(200).json(formattedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch checklist items.' });
  }
};


module.exports = { getAllItems, createItems,getItemsByTemplate, getChecklistItemsForToday, saveOrUpdateChecklistResponse};
