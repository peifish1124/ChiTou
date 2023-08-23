require('dotenv').config();
const express = require('express');

// import discordbot
const discordBot = require('./utils/discordbot_service/discordbot');

// routes require
const userRoute = require('./server/routes/user_route');
const scheduleRoute = require('./server/routes/schedule_route');
const tripRoute = require('./server/routes/trip_route');
const eventRoute = require('./server/routes/event_route');
const weatherRoute = require('./server/routes/weather_route');
const searchRoute = require('./server/routes/search_route');

const lineBotUtil = require('./utils/line_bot');

const app = express();
const port = process.env.WEB_PORT;

function excludeJsonMiddleware(req, res, next) {
    if (req.path === '/line-webhook') {
      next();
    } else {
      express.json()(req, res, next);
    }
}
app.use(excludeJsonMiddleware);

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

// line bot
const line = require('@line/bot-sdk');
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);

app.post('/line-webhook', line.middleware(config), async (req, res) => {
    try {
      for (const event of req.body.events) {
        await lineBotUtil.handleEvent(event, client);
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
});

app.post('/simulate-message', async (req, res) => {
  try {
    const userId = 'U6e6b7239d8b5c5baa56c7ff8bccd85a9';
    const message = {
      type: 'text',
      text: '這是模擬帳戶的訊息。',
    };

    await client.pushMessage(userId, message);

    res.status(200).json({ message: '訊息已成功發送給機器人。' });
  } catch (error) {
    console.error('發送訊息時發生錯誤：', error);
    res.status(500).json({ error: '發送訊息時發生錯誤。' });
  }
});

app.listen(port, () => {
    console.log('running successfully');
});

// start discord bot
discordBot.startDiscordBot();
