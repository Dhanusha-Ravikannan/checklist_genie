const express = require('express');
const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const getUserPosition = async (req, res) => {
  try {
    const { organisation_user_id, user_id } = req.user;

    const userProfile = await prisma.user.findUnique({
      where: { id: user_id },
      include: {
        OrganisationUsers: {
          where: { id: organisation_user_id },
          include: {
            organisation: true,
            OrganisationUserPosition: true,
          }
        },
      }
    });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    const responseData = {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      image: userProfile.image,
      createdAt: userProfile.created_at,
      organizations: userProfile.OrganisationUsers.map(orgUser => ({
        id: orgUser.id,
        organizationId: orgUser.organisation_id,
        organizationName: orgUser.organisation?.organisation,
        userType: orgUser.user_type,
        positions: orgUser.OrganisationUserPosition.map(pos => pos.user_position),
        createdAt: orgUser.created_at
      }))
    };

    const userPositions = await prisma.organisation_User_position.findMany({
      where: {
        user_id: user_id,
      },
    });

    res.status(200).json({userPositions, responseData});
  } catch (error) {
    console.error("Error in getUserPosition:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const createUserPosition = async (req, res) => {
  try {
    const { user_position } = req.body;
    const { organisation_user_id, user_id, email } = req.user; 

    if (!Array.isArray(user_position) || user_position.length === 0) {
      return res
        .status(400)
        .json({ error: "user_position must be a non-empty array" });
    }

    const domain = email.substring(email.lastIndexOf("@") + 1, email.lastIndexOf("."));

    let positionsToAdd = user_position.map((position) => ({
      organisation_user_id,
      user_id,
      user_position: position,
    }));

    if (domain === "ibacustechlabs") {
      const publicPositionExists = await prisma.organisation_User_position.findFirst({
        where: {
          organisation_user_id,
          user_position: "PUBLIC",
        },
      });

      if (!publicPositionExists) {
        positionsToAdd.push({
          organisation_user_id,
          user_id,
          user_position: "PUBLIC",
        });
      }
    }

    const createdPositions = await prisma.organisation_User_position.createMany({
      data: positionsToAdd,
      skipDuplicates: true,
    });

    res.status(201).json({
      message: "User positions added successfully.",
      createdPositions,
    });
  } catch (error) {
    console.error("Error in createUserPosition:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const addUserPosition = async (req, res) => {
  try {
    const { organisation_user_id, user_id } = req.user;
    const { position } = req.body;
    console.log("S", position, organisation_user_id)

    const existing = await prisma.organisation_User_position.findFirst({
      where: {
        organisation_user_id,
        user_position: position
      }
    });

    if (existing) {
      return res.status(400).json({ message: "Position already exists for user" });
    }

    const newPosition = await prisma.organisation_User_position.create({
      data: {
        organisation_user_id,
        user_position: position,
        created_at: new Date(),
        user_id:user_id
      }
    });

    res.status(201).json(newPosition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add position", error: error.message });
  }
};

const removeUserPosition = async (req, res) => {
  try {
    const { position } = req.body;

    await prisma.organisation_User_position.delete({
      where: {id:position }
    });

    res.status(200).json({ message: "Position removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove position", error: error.message });
  }
};

module.exports = { getUserPosition, createUserPosition, addUserPosition, removeUserPosition };
