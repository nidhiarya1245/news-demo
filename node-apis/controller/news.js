const { apiCall } = require('../api.js');
const { NEWS_SEARCH_API_URL } = require('../constants/api');
const querystring = require('querystring');

module.exports = {
  getNews: async (searchQueryStr, pageNumber) => {
    const searchUrl = { ...NEWS_SEARCH_API_URL };
    const quertStr = {
      'q': searchQueryStr,
      'page': pageNumber,
    }

    searchUrl.path += '&' + querystring.encode(quertStr);

    return await apiCall(searchUrl)
      .catch(err => {
        throw err;
      });
  }
}