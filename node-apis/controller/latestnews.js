const { apiCall } = require('../api.js');
const { LATEST_NEWS_API_URL } = require('../constants/api');


module.exports = {
  getLatestnews: async (pageNumber) => {
    const url = { ...LATEST_NEWS_API_URL };
    url.path += "&page=" + pageNumber;
    return await apiCall(url)
      .catch(error => {
        throw error;
      });
  }
}