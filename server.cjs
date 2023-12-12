
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const {getUsers, createUser, getUserByNamePass, deleteUser} = require('./db/user.cjs');
const {createPost, getAllPosts, getPostsByUserId, deletePostByUser} = require('./db/post.cjs');

app.use(express.json());
app.use('/assets', express.static(__dirname + '/dist/assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
});
/////GET ALL USERS
app.get('/users', async(req, res) => {
    try {
        const allUsers = await getUsers();
        res.send(allUsers);      
    } catch (error) {
        console.log(error);
    }
});
//////LOGIN USER RETURN TOKEN
app.get('/users/login', async(req, res) => {
    try {
        const thisUser = await getUserByNamePass(req.body);
        res.send(thisUser);       
    } catch (error) {
        console.log(error);
    }
});
/////CREATE USER
app.post('/users',async(req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.send(newUser);
    } catch (error) {
        console.log(error);
    }   
});

app.post('/users/delete', async(req, res) =>{
    try {
        const deletedUser = await deleteUser(req.body);
        res.send(deletedUser);
    } catch (error) {
        
    }
})

/////CREATE POST
app.post('/posts', async(req, res) => {
    try {
        const newPost = await createPost(req.body);
        res.send(newPost);
    } catch (error) {
        console.log(error);
    }
});

/////GET ALL POSTS BY USER ID EMBEDDED IN TOKEN
app.get('/posts/me', async(req, res) => {
    console.log(req.headers);
    const token = req.headers.authorization.slice(7);
    try {
        const allUserPosts = await getPostsByUserId(token);
        res.send(allUserPosts);
    } catch (error) {
        console.log(error);
    }
});

/////GET ALL POSTS
app.get('/posts', async(req, res) => {
    try {
        const allPosts = await getAllPosts();
        res.send(allPosts);
    } catch (error) {
        console.log(error);
    }
});

//////DELETE POST BY USER
app.post('/posts/delete', async(req, res) => {
    try {
        const token = req.headers.authorization.slice(7);
        const allPostsDeletedByUser = await deletePostByUser(token);
        res.send(allPostsDeletedByUser);
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => {console.log(`Listneing on port ${PORT}`)});