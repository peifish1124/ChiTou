module.exports = {
  handleEvent: async (event, client) => {
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