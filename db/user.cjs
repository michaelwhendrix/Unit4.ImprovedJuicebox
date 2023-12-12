const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const prisma = new PrismaClient()

/////CREATE NEW USER
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
/////GET ALL USERS
const getUsers = async() => {
    try {
        const allUsers = await prisma.user.findMany();
        return allUsers;      
    } catch (error) {
        console.log(error);
    }
}
////USER LOGIN
const getUserByNamePass = async(body) => {
    try {
        const oneUser = await prisma.user.findUnique({
            where: body
        });

        if(oneUser) {
            const userToken = jwt.sign({id:oneUser.id},process.env.SECRET);
            return userToken;
        }
        else{
            const error = {'status-401':'bad credentials'};
            return error;
        }
      
    } catch (error) {
        console.log(error);
    }
}
module.exports = { createUser,getUsers,getUserByNamePass };