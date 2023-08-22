require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
// // routes require
// const userRoute = require('./server/routes/user_route');
// const scheduleRoute = require('./server/routes/schedule_route');
// const tripRoute = require('./server/routes/trip_route');
// const eventRoute = require('./server/routes/event_route');
// const weatherRoute = require('./server/routes/weather_route');
// const searchRoute = require('./server/routes/search_route');

// const app = express();
// const port = process.env.WEB_PORT;

// app.use(express.json());
// app.use('/images', express.static('static'));

// app.all('*', (req, res, next) => {
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

// // routes
// app.use('/users', userRoute);
// app.use('/schedules', scheduleRoute);
// app.use('/trips', tripRoute);
// app.use('/events', eventRoute);
// app.use('/weathers', weatherRoute);
// app.use('/searches', searchRoute);

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center; padding: 20px;">Hello, My Server!</h1>');
});



const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
app.post('/callback', line.middleware(config), (req, res) => {
    console.log('---------callback---------')
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
        console.error(err);
        res.status(500).end();
        });
});

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }

    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
}

// var linebot = require("linebot");
// var bot = linebot({
//     channelId: process.env.CHANNEL_ID,
//     channelSecret: process.env.CHANNEL_SECRET,
//     channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
// });
// const linebotParser = bot.parser();

// 當有人傳送訊息給 Bot 時
// bot.on("message", function (event) {
//     // event.message.text 是使用者傳給bot的訊息
//     console.log(event.message.text);
//     event.reply(
//         "不知道該問什麼嗎？ 歡迎透過以下的關鍵字與我互動！"
//     );
// });
  
// 送出帶有 line-bot 需要資訊的 POST 請求
// app.post("/", linebotParser);

app.listen(port, () => {
    console.log('running successfully');
});