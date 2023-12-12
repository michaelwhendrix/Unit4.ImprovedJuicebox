
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const prisma = new PrismaClient()

/////CREATE NEW USER
const createUser = async(body) => {
    console.log(body);
    const hashPassword = await bcrypt.hash(body.password,3);
    try {
        const newUser = await prisma.user.create({
            data:{
                username:body.username,
                password:hashPassword
            }  
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
            where: {
                username: body.username
            }
        });
        if(oneUser) {
            const verifiedPassword = bcrypt.compare(body.password, oneUser.password);
        
        

        if(verifiedPassword) {
            const userToken = jwt.sign({id:oneUser.id},process.env.SECRET);
            return userToken;
        }
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