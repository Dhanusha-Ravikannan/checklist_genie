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

module.exports = {getAllUsers,createUsers}
