const { getNews } = require("../controller/news.js");
const { ARTICLES_RESPONSE_200, RESPONSE_ANY } = require('../constants/articleApiResponse.js');
const { apiErrorResponse } = require('../errors/apiErrors.js');

module.exports = {
  searchNewsRoute: {
    method: "GET",
    path: '/getNews',
    options: {
      // validate: {
      //   params: Joi.object({
      //     query: Joi.string(),
      //   })
      // },
      handler: async (request, h) => {
        const { searchTerm, pageNumber } = request.query;
        try {
          const result = await getNews(searchTerm, pageNumber);
          result = { ...result, pageNumber: pageNumber };
        }
        catch (error) {
          apiErrorResponse(error);
        }

      },
      description: "Get news",
      notes: "Returns news, If search String is provided then result with searching string in title and description",
      tags: ["api"], // ADD THIS TAG
      response: {
        status: {
          200: ARTICLES_RESPONSE_200,
          400: RESPONSE_ANY,
        },
      },
    },
  }
};