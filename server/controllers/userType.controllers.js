const express = require('express');
const {PrismaClient} = require('@prisma/client')
const prisma =  new PrismaClient();


const gettingUserType = async (req,res) => {
    try {
       const {user_id} = req.user;
       const  getUserType = await prisma.organisation_Users.findMany({
        where : {
            user_id : user_id
        }
       })
       res.status(200).json({message : "User Type Found", getUserType})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "User type not found"})
    }
}

module.exports = {gettingUserType}