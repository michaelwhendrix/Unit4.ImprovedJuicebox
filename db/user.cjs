const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createUser = async(body) => {
    console.log(body);
    try {
        const oneUser = await prisma.user.create({
            data:body   
        });
        return oneUser;
    } catch (error) {
       console.log(error); 
    }
}

const getUsers = async() => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
}

const getUserByName = async(name) => {
    const oneUser = await prisma.user.findUnique({
        where: {
            username: name
        }
    });
    return oneUser;
}
module.exports = { createUser,getUsers,getUserByName };