module.exports = {
  addedTrip: (senderName, receiverName, tripName) => {
    const subject = `ChiTou: 你已經被加入旅程  ${tripName}`;
    const html = `<p>Hi <strong>${receiverName}</strong>, </p>\
            <p> <strong>${senderName}</strong> 已經將你加入 <strong>${tripName}</strong>，我們誠摯邀請你參加這次旅程。<br>\
            點擊 <a href="https://chi-tou-git-adedevelop-peifish1124.vercel.app">這裡</a> 造訪我們的網站 <strong>ChiTou</strong>，與朋友一起展開新的旅程吧！</p>\
            <p>Best regards, <br>\
            ChiTou ;></p>`;
    return [subject, html];
  },

  createTrip: (senderName, tripName) => {
    const subject = `ChiTou: 旅程 ${tripName} 創建成功`;
    const html = `<p>Hi <strong>${senderName}</strong>, </p>\
            <p>旅程 <strong>${tripName}</strong> 已經成功創建，<br>\
            點擊 <a href="https://chi-tou-git-adedevelop-peifish1124.vercel.app">這裡</a> 造訪我們的網站 <strong>ChiTou</strong>，與朋友一同開啟新的旅程吧！</p>\
            <p>Best regards, <br>\
            ChiTou ;></p>`;

    return [subject, html];
  },

  // TODO: (opt.) implements preTrip
  preTrip: (receiverName, tripName) => {
    const subject = `ChiTou: 旅程 ${tripName} 即將出發`;
    const html = `<p>Hi <strong>${receiverName}</strong>, </p>
            <p><strong>${tripName}</strong> 即將於明天出發，<br>
            點擊 <a href="https://chi-tou-git-adedevelop-peifish1124.vercel.app">這裡</a> 前往我們的網站 <strong>ChiTou</strong>，與朋友一同開啟新的旅程吧！</p>
            <p>Best regards, <br>\
            ChiTou ;></p>`;

    return [subject, html];
  },
}