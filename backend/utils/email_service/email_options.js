module.exports = {
  signup: (receiverName) => {
    const subject = 'ChiTou: 註冊帳號成功';
    const html = `<p>Hi <strong><i>${receiverName}</i></strong>, </p>
            <p>感謝你加入 <strong><i>ChiTou</i></strong>！你的帳號已成功創建。<br>
              我們非常期待能與你一同探索新的旅程和冒險。<br>
              點擊 <a href="https://chi-tou.vercel.app/login">這裡</a> 造訪我們的網站 <strong><i>ChiTou</i></strong>，與朋友一起展開新的旅程吧！</p>
          
            <p>Best regards, <br>
              ChiTou ;></p>`;

    return [subject, html];
  },
  addedTrip: (senderName, receiverName, tripName) => {
    const subject = `ChiTou: 你已經被加入旅程  ${tripName}`;
    const html = `<p>Hi <strong><i>${receiverName}</i></strong>, </p>\
            <p> <strong><i>${senderName}</i></strong> 已經將你加入 <strong><i>${tripName}</i></strong>，我們誠摯邀請你參加這次旅程。<br>\
            點擊 <a href="https://chi-tou.vercel.app/login">這裡</a> 造訪我們的網站 <strong><i>ChiTou</i></strong>，與朋友一起展開新的旅程吧！</p>\
            <p>Best regards, <br>\
            ChiTou ;></p>`;
    return [subject, html];
  },

  createTrip: (senderName, tripName) => {
    const subject = `ChiTou: 旅程 ${tripName} 創建成功`;
    const html = `<p>Hi <strong><i>${senderName}</i></strong>, </p>\
            <p>旅程 <strong><i>${tripName}</i></strong> 已經成功創建，<br>\
            點擊 <a href="https://chi-tou.vercel.app/login">這裡</a> 造訪我們的網站 <strong><i>ChiTou</i></strong>，與朋友一同開啟新的旅程吧！</p>\
            <p>Best regards, <br>\
            ChiTou ;></p>`;

    return [subject, html];
  },

  // TODO: (opt.) implements preTrip
  preTrip: (receiverName, tripName) => {
    const subject = `ChiTou: 旅程 ${tripName} 即將出發`;
    const html = `<p>Hi <strong><i>${receiverName}</i></strong>, </p>
            <p><strong><i>${tripName}</i></strong> 即將於明天出發，<br>
            點擊 <a href="https://chi-tou.vercel.app/login">這裡</a> 前往我們的網站 <strong><i>ChiTou</i></strong>，與朋友一同開啟新的旅程吧！</p>
            <p>Best regards, <br>\
            ChiTou ;></p>`;

    return [subject, html];
  },
}