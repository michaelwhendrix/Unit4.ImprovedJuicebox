const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/assets', express.static(__dirname + '/dist/assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
});

app.listen(PORT, () => {console.log(`Listneing on port ${PORT}`)});