const errorRes = require('../../utils/error_message_util');
const searchUtil = require('../../utils/search_util');
const searchModel = require('../models/search_model');

exports.getGoogleSearch = async (req, res) => {
  console.log('Get Google Search');

  if (req.headers['content-type'] !== 'application/json') {
    const [errorCode, errorMessage] = errorRes.contentTypeError();
    return res.status(errorCode).json({ error: errorMessage });
  }

  const { place_name } = req.body;
  if (!place_name) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    var summary = '';
    const note = await searchModel.searchResult(place_name);
    if (note === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    } else if (!note) {
      const googleSearchUrls = await searchUtil.getGoogleSearchUrls(`${place_name} ${process.env.SEARCH_ARTICLE_TYPE}`);
      if (googleSearchUrls === null) {
        const [errorCode, errorMessage] = errorRes.googleSearchConnectFailed();
        return res.status(errorCode).json({ error: errorMessage });
      }

      const googleSearchArticles = await searchUtil.getGoogleSearchArticles(googleSearchUrls);

      summary = await searchUtil.openAISummary(googleSearchArticles);
      if (summary === null) {
        const [errorCode, errorMessage] = errorRes.openAIConnectFailed();
        return res.status(errorCode).json({ error: errorMessage });
      }

      const insertResult = await searchModel.insertSearch(place_name, summary);
      if (insertResult === null) {
        const [errorCode, errorMessage] = errorRes.queryFailed();
        return res.status(errorCode).json({ error: errorMessage });
      }
    } else {
      summary = note;
    }

    console.log('Get Google Search Success');
    res.status(200).json({
      data: {
        search: summary
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
}