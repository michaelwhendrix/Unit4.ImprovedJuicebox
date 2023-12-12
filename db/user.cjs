const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getUsers = async() => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
}

module.exports = { getUsers };