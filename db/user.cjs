const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()

const createUser = async(body) => {
    console.log(body);
    try {
        const newUser = await prisma.user.create({
            data:body   
        });
        return newUser;
    } catch (error) {
       console.log(error); 
    }
}

const getUsers = async() => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
}

const getUserByNamePass = async(body) => {
    try {
        const oneUser = await prisma.user.findUnique({
            where: body
        });
        return oneUser;
      
    } catch (error) {
        console.log(error);
    }
}
module.exports = { createUser,getUsers,getUserByNamePass };