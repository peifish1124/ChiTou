require('dotenv').config();
const express = require('express');
// routes require
const userRoute = require('./server/routes/user_route');

const app = express();
const port = process.env.WEB_PORT;

app.use(express.json());

// routes
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center; padding: 20px;">Hello, My Server!</h1>');
});

app.listen(port, () => {
    console.log('running successfully');
});