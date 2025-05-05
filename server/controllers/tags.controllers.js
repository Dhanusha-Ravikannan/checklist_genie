const express = require("express");
const { PrismaClient, userPosition, frequency } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTags = async (req, res) => {
  try {
    const { organisation_id } = req.user;

    const tags = await prisma.tags.findMany({
      where: {
        OrganisationUsers: {
          organisation_id: organisation_id
        }
      },
      include: {
        OrganisationUsers: true 
      }
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching all tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};



const createTags = async (req, res) => {
  try {
    const { tag_name, user_position, description,recurrent } = req.body;
    const { organisation_user_id } = req.user;
    const newTag = await prisma.tags.create({
      data: {
        tag_name,
        description,
        created_at: new Date(),
        user_position,
        recurrent ,
        organisation_user_id,
      },
    });
    res.status(200).json(newTag);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Failed to create tag" });
  }
};



const getAllTagsPosition = async (req, res) => {
  try {
    const tagPosition = await prisma.tags.findMany({
      where: {
        user_position: {
          in: [
            "FULL_STACK_DEVELOPER",
            "POWER_BI_DEVELOPER",
            "SALES",
            "HUMAN_RESOURCE",
            "TESTING",
            "SALESFORCE",
          ],
        },
      },
      include: {
        ChecklistTemplate: {
          include: {
            TemplateVersion: {
              include: {
                ChecklistTemplateLinkedItems: {
                  include: {
                    ChecklistItems: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.json(tagPosition);
  } catch (error) {
    console.error("Error fetching tags for position:", error);
    res.status(500).json({ error: "Failed to fetch tags for position." });
  }
};

const getTagsForPosition = async (req, res) => {
  try {
    const { userPosition } = req.body;

    const positionTags = await prisma.tags.findMany({
      where: {
        user_position: userPosition,
      },
      include: {
        ChecklistTemplate: {
          include: {
            TemplateVersion: {
              include: {
                ChecklistTemplateLinkedItems: {
                  include: {
                    ChecklistItems: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const mapTags = positionTags.map((tag) => ({
      Tag_id: tag.id,
      Tag_name: tag.tag_name,
      user_position: tag.user_position,
      Templates: tag.ChecklistTemplate.map((template) => ({
        Template_id: template.id,
        Template_name: template.template_name,
        Tag_id: template.tag_id,
        ChecklistItems:
          template.TemplateVersion.ChecklistTemplateLinkedItems.map((item) => ({
            id: item.ChecklistItems.id,
            Item_name: item.ChecklistItems.checklist_name,
            input_type: item.ChecklistItems.input_type,
          })),
      })),
    }));
    res.status(200).json(mapTags);
  } catch (error) {
    console.log(error);
  }
};

const getTagWithTemplateAndItems = async (req, res) => {
  try {
    const { tag_id } = req.params;

    const tag = await prisma.tags.findUnique({
      where: {
        id: parseInt(tag_id),
      },
      include: {
        ChecklistTemplate: true,
      },
    });

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    const items = await prisma.checklist_items.findMany({
      where: {
        tag_id: parseInt(tag_id),
      },
    });

    const response = {
      Tag_id: tag.id,
      Tag_name: tag.tag_name,
      Templates: tag.ChecklistTemplate.map((template) => ({
        Template_id: template.id,
        Template_name: template.template_name,
      })),
      Items: items.map((item) => ({
        Item_id: item.id,
        Item_name: item.checklist_name,
        Input_type: item.input_type,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching tag with template and items:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch tag with template and items." });
  }
};

const getTagsByUserPosition = async (req, res) => {
  try {
    const { organisation_user_id } = req.user;

    const getPositionTags = await prisma.organisation_User_position.findMany({
      where: {
        organisation_user_id: organisation_user_id,
      },
      select: {
        user_position: true,
      },
    });

    const user_position = getPositionTags.map((pos) => pos.user_position);

    const tags = await prisma.tags.findMany({
      where: {
        user_position: {
          in: user_position,
        },
      },
    });

    res.status(200).json({ message: "Tags fetched", tags });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tags." });
  }
};

const deleteTag = async (req, res) => {
  try {
    const { tag_id } = req.params;

    const tagId = parseInt(tag_id);

    await prisma.checklist_template_linked_items.deleteMany({
      where: {
        ChecklistItems: { tag_id: tagId },
      },
    });

    await prisma.checklist_template_owners.deleteMany({
      where: {
        ChecklistTemplate: {
          tag_id: tagId,
        },
      },
    });
    await prisma.checklist_template_version.deleteMany({
      where: {
        ChecklistTemplate: {
          tag_id: tagId,
        },
      },
    });

    await prisma.checklist_items.deleteMany({
      where: { tag_id: tagId },
    });

    await prisma.checklist_template.deleteMany({
      where: { tag_id: tagId },
    });

    const delTags = await prisma.tags.delete({
      where: { id: tagId },
    });

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error deleting tag and related data" });
  }
};

module.exports = {
  getAllTags,
  createTags,
  getAllTagsPosition,
  getTagsForPosition,
  getTagsByUserPosition,
  getTagWithTemplateAndItems,
  deleteTag,
};
