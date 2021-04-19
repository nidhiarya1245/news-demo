const Joi = require("joi");

module.exports = {
  PAGE_NUMBER_PARAM : Joi.object({
    pageNumber: Joi.number(),
  }),
  PAGE_NUMBER_AND_QUERY_PARAM : Joi.object({
    searchTerm: Joi.string(),
    pageNumber: Joi.number(),
  }),

}