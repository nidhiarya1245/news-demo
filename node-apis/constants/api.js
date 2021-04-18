
let apiobj = {
  host: process.env.apiURL,
}

module.exports = {
  LATEST_NEWS_API_URL: {
    ...apiobj,
    path: '/v2/top-headlines?country=gb&apiKey=' + process.env.newsApiKey + "&pageSize=10",
  },
  NEWS_SEARCH_API_URL: {
    ...apiobj,
    path: '/v2/everything?apiKey=' + process.env.newsApiKey + "&pageSize=10",
  }
};