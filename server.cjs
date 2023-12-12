
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const {getUsers, createUser} = require('./db/user.cjs');

app.use(express.json());
app.use('/assets', express.static(__dirname + '/dist/assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
});

app.get('/users', async(req, res) => {
    const allUsers = await getUsers();
    res.send(allUsers);
});

app.post('/users',async(req, res) => {
    try {
        console.log(req.body);
        const newUser = await createUser(req.body);
        res.send(newUser);
    } catch (error) {
        console.log(error);
    }
    
});

app.listen(PORT, () => {console.log(`Listneing on port ${PORT}`)});