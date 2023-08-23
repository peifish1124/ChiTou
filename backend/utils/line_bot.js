module.exports = {
  handleEvent: async (event, client) => {
    if (event.type === 'join' && event.source.type === 'group') {
      const welcomeMessage = {
        type: 'text',
        text: '歡迎加入本群組！',
      };

      await client.replyMessage(event.replyToken, welcomeMessage);
    }

    if (event.type === 'message' && event.message.type === 'text') {
      const messageText = event.message.text;
      if (messageText === 'Hello') {
        await client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Hello, how can I help you?',
        });
      }
    }
  }
}