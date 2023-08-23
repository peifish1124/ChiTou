const tripModel = require('../server/models/trip_model');

module.exports = {
  handleEvent: async (event, client) => {
    if (event.type === 'join' && event.source.type === 'group') {
      const welcomeMessage = {
        type: 'text',
        text: '歡迎加入 ChiTou 機器人～\n 請幫我輸入你們在 ChiTou 的旅遊 ID（可於 ChiTou 頁面中看到）！',
      };

      await client.replyMessage(event.replyToken, welcomeMessage);
    }

    if (event.type === 'message' && event.message.type === 'text') {
      const messageText = event.message.text;
      console.log(`使用者 ID: ${event.source.userId}`);
      if (/^-?\d+$/.test(messageText)) {
        const tripName = await tripModel.getTripName(parseInt(messageText));
        await client.replyMessage(event.replyToken, {
            type: 'text',
            text: `Hello ${tripName} 的小夥伴們，之後行程有任何變更我都會通知你們呦～`,
        });
      }

      if(messageText === '這是模擬帳戶的訊息。'){
        await client.replyMessage(event.replyToken, {
          type: 'text',
          text: `Hello Hello`,
      });
      }
    }
  }
}