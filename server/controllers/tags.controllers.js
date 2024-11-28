const express = require("express");
const { PrismaClient, userPosition } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTags = async (req, res) => {
  try {
    const tags = await prisma.tags.findMany({
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
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching all tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};

const createTags = async (req, res) => {
  try {
    const { tag_name, user_position, description } = req.body;
    const { organisation_user_id } = req.user;

    const newTag = await prisma.tags.create({
      data: {
        tag_name,
        description,
        created_at: new Date(),
        user_position,
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

module.exports = {
  getAllTags,
  createTags,
  getAllTagsPosition,
  getTagsForPosition,
  getTagsByUserPosition,
};
