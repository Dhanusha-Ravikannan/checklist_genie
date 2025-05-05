const { PrismaClient } = require('@prisma/client');

const express = require('express')
const prisma = new PrismaClient();

const getAllUsers = async (req,res) => {
    try {
        const user = await prisma.user.findMany()
        res.status(200).json(user)
    } catch (error) {
       console. log(error)
    }
}

const createUsers = async(req,res) => {

    const {name, email, image,created_at} = req.body;

    try {
        const newUser = await prisma.user.create({
            data : {
                name,
                email,
                image,
                created_at
            }
            
            
        })
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
    }
}

const getUsersbyID = async(req,res) => {
    try {
        const {id} = req.params;
        const getUserID = await prisma.user.findMany({
            where : {id : parseInt(id)}
        })
        res.status(200).json({message : "success",getUserID})
    } catch (error) {
        console.log(error)
        res.status(404).json({error:"Error"})
    }
}

module.exports = {getAllUsers,createUsers,getUsersbyID}
