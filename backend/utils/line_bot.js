const tripModel = require('../server/models/trip_model');

const line = require('@line/bot-sdk');
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);

module.exports = {
  handleEvent: async (event) => {
    if (event.type === 'join' && event.source.type === 'group') {
      const welcomeMessage = {
        type: 'text',
        text: '歡迎加入 ChiTou 機器人～\n 請幫我輸入你們在 ChiTou 的旅遊 ID（可於 ChiTou 頁面中看到）！',
      };

      await client.replyMessage(event.replyToken, welcomeMessage);
    }

    if (event.type === 'message' && event.message.type === 'text') {
      const messageText = event.message.text;
      await tripModel.addLineGroupId(event.source.groupId, parseInt(messageText));

      if (/^-?\d+$/.test(messageText)) {
        const tripName = await tripModel.getTripName(parseInt(messageText));
        await client.replyMessage(event.replyToken, {
            type: 'text',
            text: `Hello『${tripName}』 的小夥伴們，\n 之後行程有任何變更我都會通知你們呦～`,
        });
      }

    }
  },
  line,
  config,
  client
}