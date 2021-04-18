const { getLatestnews } = require("../controller/latestnews.js");
const {ARTICLES_RESPONSE_200, RESPONSE_ANY} = require('../constants/articleApiResponse.js')
const { apiErrorResponse } = require('../errors/apiErrors.js');

module.exports = {
  latestNewsRoute: {
    method: "GET",
    path: "/getLatestNews/",
    options: {
      handler: async (req, h) => {
        const { pageNumber } = req.query;
        try {
        const result = await getLatestnews(pageNumber);
        return {...result, pageNumber: pageNumber};
        }
        catch (error) {
          apiErrorResponse(error);
        }
      },
      description: "Get Latest news",
      notes: "Returns Latest news",
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