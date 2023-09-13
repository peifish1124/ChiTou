# ChiTou
## 動機
- 希望解決使用者在安排出遊的時候會遇到的問題：
  - 懶得用編輯程式、共編規劃行程
  - 要開多個平台去整合各種資訊：用 Google docs 來紀錄、用 Google search 來查景點、用 Google map 來查景點間的距離、查詢天氣
  - 提出了多種方案但不知道大家想選哪個行程
  - 需要預估交通時間、停留時間
- 因此我們 ChiTou 的核心概念就是：整合共編、Google Search、Google Map、天氣資訊 的平台，節省使用者在安排旅行所需要的時間，並提供包含旅程所需時間的最終規劃結果

## 功能
- basic features
  - 創建旅行、搜尋過往所有參與過的旅行
    <img width="747" alt="截圖 2023-09-14 上午1 50 04" src="https://github.com/peifish1124/ChiTou/assets/58721888/3cb64609-6587-46da-82dd-e115dca17f0a">

  - 旅行詳細介面
    - 對行程進行投票
    - 可以查看天氣、預估交通時間
- Google Maps API
  - 創建行程
    - 可以在地圖上透過 filter 如：行政區、大分類，也可透過關鍵字搜尋
    - 編輯筆記和透過拖拉來改變行程順序
      <img width="716" alt="截圖 2023-09-14 上午1 50 15" src="https://github.com/peifish1124/ChiTou/assets/58721888/8437ed79-1702-404b-a3d9-38c63a0031db">
  - 透過 Google Maps 實踐的功能：
    - 搜尋 關鍵字 → 回傳 多個點座標
    - 點選 大類別（ex: 餐廳、外帶） → 回傳 多個點座標
    - 點選 行政區 → 地圖能拉到相對應的位置
    - 點選 marker 後 → 可以跳出小卡顯示 地點、評分、評論數、照片、營業中、營業時間
    - 兩點間的交通時間計算
- ChatGPT Note
    - 我們希望在使用者加入某個行程後，我們能自動為這個行程整理一些相關資訊
    - 實作方式：用 Google Search API 去搜尋文章內容並丟入 ChatGPT OpenAI 做統整，並為了加快下次搜尋速度我們會將 note 內容存入資料庫
- 通知
  - 系統本身的通知
  - 綁定 Gmail 通知
    - 創建成功 → 發 email 給創辦者
    - 被加入旅行 → 發 email 給被邀請者
    - 行程結果出爐 → 發 email 給所有人
  - Line Bot
    - 我們的網站會提供 機器人的好友連結，使用者把機器人加進群組後，就會看到這個畫面
      <img width="721" alt="截圖 2023-09-14 上午1 50 24" src="https://github.com/peifish1124/ChiTou/assets/58721888/40a26054-a42d-475f-9cc8-17da8f2bfedf">
    - 我們會請使用者輸入他們旅行的 ID，並為了驗證，會叫他們再輸入創辦者的名字
      <img width="723" alt="截圖 2023-09-14 上午1 50 33" src="https://github.com/peifish1124/ChiTou/assets/58721888/d432207d-d003-426a-a0ef-1bc79b125233">
    - 每當該群組的行程有變動時，例如：創建一個行程，回到 Line 群組畫面就會看到機器人通知更動後的整體行程
      <img width="716" alt="截圖 2023-09-14 上午1 50 43" src="https://github.com/peifish1124/ChiTou/assets/58721888/39412d0a-c365-4dde-a8d3-66fc548421d6">

    - 這個功能可以當群組中的任一人有去更動行程時，群組的大家都可以透過 Line 來主動收到通知
  - Discord Bot
    - 主要是做系統端的檢查通知，系統維護端可以透過 Discord Bot 來檢查 server 是否出現錯誤、系統的 logs 紀錄、查看系統統計數據報告等

## Frontend
- 負責成員：李芷萱、劉畇德
- 技術架構
  - Next.js
  - APIs: Google Maps API
  - Deploy: Vercel
## Backend
- 負責成員：陳沛妤、賴心云
- 技術架構
  - Express.js、Nginx
  - APIs: 中央氣象局開放資料 API、LINE Bot Messaging API、Google Search API、ChatGPT OpenAI、Discord Bot API、Gmail API
  - Deploy: AWS EC2
  - Database: AWS RDS
## 附件
- DB Doc: https://hackmd.io/@peifish1124/HkPHF-Pn2
- API Doc: https://hackmd.io/@peifish1124/H1sK4bvnh
