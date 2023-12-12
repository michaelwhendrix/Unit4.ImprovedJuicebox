const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()


const createPost = async(body) => {
    const newPost = await prisma.post.create({
        data:body
    });
    return newPost;
}

const getAllPosts = async() =>{
    const allPosts = await prisma.post.findMany();
    return allPosts;
}

const getPostsByUserId = async(token) => {
    const userId = jwt.verify(token,process.env.SECRET);
    console.log(userId);
    const allUserPosts = await prisma.post.findMany({
            where:{
                authorId:userId.id
            }
            
    });
    return allUserPosts;
}
/////DELETE POST
const deletePostByUser = async(token) => {
    try {
        const userId = jwt.verify(token,process.env.SECRET);
        const deletedPostOfUser = await prisma.post.deleteMany({
            where: {
                authorId:userId.id
            }
        });
        return deletedPostOfUser;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {createPost, getAllPosts, getPostsByUserId,deletePostByUser};