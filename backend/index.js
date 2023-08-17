require('dotenv').config();
const express = require('express');

// routes require
const userRoute = require('./server/routes/user_route');
const scheduleRoute = require('./server/routes/schedule_route');
const tripRoute = require('./server/routes/trip_route');
const eventRoute = require('./server/routes/event_route');

const app = express();
const port = process.env.WEB_PORT;

app.use(express.json());
app.use('/images', express.static('static'));

// routes
app.use('/users', userRoute);
app.use('/schedules', scheduleRoute);
app.use('/trips', tripRoute);
app.use('/events', eventRoute);

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center; padding: 20px;">Hello, My Server!</h1>');
});

app.listen(port, () => {
    console.log('running successfully');
});