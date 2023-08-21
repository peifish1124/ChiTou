const axios = require('axios');
const cheerio = require('cheerio');
const { Configuration, OpenAIApi } = require('openai');

module.exports = {
  getGoogleSearchUrls: async (searchText) => {
    try {
      const googleSearchApiUrl = `https://www.googleapis.com/customsearch/v1?cx=${process.env.SEARCH_ENGINE_ID}&key=${process.env.SEARCH_API_KEY}&q=${searchText}&num=${process.env.SEARCH_NUM}`;
      const response = await axios.get(googleSearchApiUrl);
      const googleSearchData = response.data.items;
  
      const resultUrl = [];
      googleSearchData.forEach(item => {
        const formattedUrl = item.formattedUrl;
        resultUrl.push(formattedUrl);
      })
      return resultUrl;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getGoogleSearchArticles: async (googleSearchUrls) => {
    var total_text_arr = '';
    for (var i = 0; i < googleSearchUrls.length; i++) {
      try {
        const response = await axios.get(googleSearchUrls[i]);
        const html = response.data;
    
        const $ = cheerio.load(html);
        const article = $('article');
        const paragraphs = article.find('p');

        if (paragraphs.length !== 0) {
          paragraphs.each((index, element) => {
            const text = $(element).text();
            total_text_arr += text;
          });
        }
      } catch (error) {
        console.error(`Getting URL ${i+1} caused error.`);
        continue;
      }
    }
    return total_text_arr;
  },
  openAISummary: async (googleSearchArticles) => {
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user", "content": `請幫我統整以下文章內容（200字以內）  ${googleSearchArticles.slice(0, 1500)}`
          }
        ]
      });
      return completion.data.choices[0].message.content;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}