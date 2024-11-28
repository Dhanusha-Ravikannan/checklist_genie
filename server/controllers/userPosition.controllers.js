const express = require('express');
const {PrismaClient, userPosition} = require('@prisma/client');
const prisma = new PrismaClient ();


const getUserPosition = async (req,res) => {
    try {
       const {user_id} = req.user;
       console.log("user ID : ",user_id)
       const userPositions = await prisma.organisation_User_position.findMany({
        where : {
            user_id : user_id,
        },
        select : {
          user_position : true
        }
       })
         res.status(200).json(userPositions)
         
    } catch (error) {
        console.log(error)
    }
}
      
  
  

  const createUserPosition = async (req, res) => {
    try {
      const { user_position } = req.body; 
      const { organisation_user_id,user_id } = req.user; 
  
      if (!Array.isArray(user_position) || user_position.length === 0) {
        return res.status(400).json({ error: 'userPositions must be a non-empty array' });
      }
  
      const positionsToAdd = user_position.map((userPosition) => ({
        organisation_user_id,
        user_id,
        user_position: userPosition, 
      }));
  
      const createdPositions = await prisma.organisation_User_position.createMany({
        
        data: positionsToAdd,
        
      });
  
      res.status(201).json({
        message: 'User positions added successfully.',
        createdPositions
           
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  


module.exports = {getUserPosition,createUserPosition}


