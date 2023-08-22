require('dotenv').config();
const express = require('express');

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

const line = require('@line/bot-sdk');
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);

app.post('/line-webhook', line.middleware(config), async (req, res) => {
    try {
      for (const event of req.body.events) {
        await handleEvent(event);
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
});

async function handleEvent(event) {
    if (event.type === 'message' && event.message.type === 'text') {
        const messageText = event.message.text;
        if (messageText === 'Hello') {
        await client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Hello, how can I help you?',
        });
        }
    }
// 如果不需要回應，可以直接返回
}

app.listen(port, () => {
    console.log('running successfully');
});