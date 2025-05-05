const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getItemResponses = async (req, res) => {
  try {
    const itemResponse = await prisma.checklist_item_response.findMany();

    const itemResponsesFormatted = itemResponse.map((item) => ({ 
      ...item,
      status: item.status ? "Yes" : "No",
    }));
    return res.status(200).json(itemResponse, itemResponsesFormatted);
  } catch (error) { 
    console.error("Error creating item response:", error);
    return res.status(500).json({ error: "Error creating item response" });
  }
};

const getChecklistHistory = async (req, res) => { 
  try {
    const { templateIds } = req.body;
    const {organisation_user_id} = req.user;

    if (!templateIds || !Array.isArray(templateIds) || templateIds.length === 0) {
      return res.status(400).json({ error: "Template IDs are required and must be a non-empty array." });
    }

    const templateVersions = await prisma.checklist_template_version.findMany({
      where: { checklist_template_id: { in: templateIds } }
    });

    if (templateVersions.length === 0) {
      return res.status(404).json({ message: "No checklist versions found for the provided template IDs." });
    }

    const versionIds = templateVersions.map(v => v.version_id);

    const linkedItems = await prisma.checklist_template_linked_items.findMany({
      where: { template_version_id: { in: versionIds } },
    });

    if (linkedItems.length === 0) {
      return res.status(404).json({ message: "No linked items found for the checklist versions." });
    }

    const checklistItemIds = linkedItems.map(item => item.checklist_item_id);

    const checklistItems = await prisma.checklist_items.findMany({
      where: { id: { in: checklistItemIds } },
      select: { id: true, checklist_name: true, input_type: true }
    });

    const checklistResponses = await prisma.checklist_item_response.findMany({
      where: { checklist_template_linked_items_id: { in: linkedItems.map(item => item.id) },organisation_user_id:organisation_user_id }
    });

    const historyByVersion = templateVersions.map(version => {
      const versionLinkedItems = linkedItems.filter(item => item.template_version_id === version.version_id);
      const itemsWithResponses = versionLinkedItems.map(linkedItem => {
        const itemDetails = checklistItems.find(item => item.id === linkedItem.checklist_item_id);
        const responses = checklistResponses.filter(response => response.checklist_template_linked_items_id === linkedItem.id);
        return {
          ...linkedItem,
          itemDetails,
          responses
        };
      });
      return {
        version_id: version.version_id,
        checklist_template_id: version.checklist_template_id,
        created_at: version.created_at,
        items: itemsWithResponses
      };
    });

    res.status(200).json(historyByVersion);
  } catch (error) {
    console.error("Error fetching checklist history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const updateItemResponse = async (req, res) => {
  try {
    const {
      status,
      comments,
      checklist_template_linked_items_id,
      template_version,
      selected_date,
      input,
    } = req.body;


    const { organisation_user_id } = req.user;

    const linkedItem = await prisma.checklist_template_linked_items.findMany({
      where: { id: checklist_template_linked_items_id },
    });


    if (linkedItem.length === 0) {
      return res
        .status(404)
        .json({ error: "Checklist template linked item not found." });
    }

    const templateVersion = await prisma.checklist_template_version.findFirst({
      where: { version_id: template_version },
    });


    if (!templateVersion) {
      return res.status(404).json({ error: "Template version not found." });
    }

    const dateTime = selected_date || new Date().toISOString().split("T")[0];

    const updatedItem = await prisma.checklist_item_response.create({
      data: {
        status: status === "Yes",
        organisation_user_id,
        comments,
        checklist_template_linked_items_id: checklist_template_linked_items_id,
        user_assigned_checklist_template_id: 1,
        template_version: templateVersion.version_id,
        selected_date: dateTime,
        created_at: new Date(),
        input,
      },
    });


    return res.status(200).json({
      message: "Response updated successfully",
      updatedItem,
    });
  } catch (error) {
    console.error("Error updating item response:", error);
    return res.status(500).json({ error: "Error updating item response" });
  }
};






module.exports = { getItemResponses, updateItemResponse, getChecklistHistory };
