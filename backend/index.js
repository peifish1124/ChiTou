require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
var morgan = require('morgan');
const moment = require("moment-timezone");

// improt logger
const logger = require('./utils/logger');

// import discordbot
const discordBot = require('./utils/discordbot_service/discordbot');

// routes require
const userRoute = require('./server/routes/user_route');
const scheduleRoute = require('./server/routes/schedule_route');
const tripRoute = require('./server/routes/trip_route');
const eventRoute = require('./server/routes/event_route');
const weatherRoute = require('./server/routes/weather_route');
const searchRoute = require('./server/routes/search_route');

const app = express();
const port = process.env.WEB_PORT;

app.use(express.json());
app.use('/images', express.static('static'));

const logFileName = `access-log-${logger.getDate()}.txt`;
var accessLogStream = fs.createWriteStream(path.join(__dirname, './logs', logFileName), { flags: 'a' })
app.use(morgan(function (tokens, req, res) {
    const taiwanTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');

    return [
        `[${taiwanTime}]\n`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        '\n',
    ].join(' ');
}, { stream: accessLogStream, skip: function (req, res) { return res.statusCode < 400 }}));

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// routes
app.use('/users', userRoute);
app.use('/schedules', scheduleRoute);
app.use('/trips', tripRoute);
app.use('/events', eventRoute);
app.use('/weathers', weatherRoute);
app.use('/searches', searchRoute);

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center; padding: 20px;">Hello, My Server!</h1>');
});

app.listen(port, () => {
    console.log('running successfully');
});

// start discord bot
discordBot.startDiscordBot();
