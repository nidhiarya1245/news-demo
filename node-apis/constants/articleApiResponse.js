const Joi = require("joi");
const { ARTICLES_RESPONSE_Label } = require('./responseLabels');
const empty = [];
const ARTICLE_KEYS = Joi.object()
  .keys({
    source: Joi.object().unknown(true),
    author: Joi.any(),
    title: Joi.string(),
    description: Joi.any(),
    publishedAt: Joi.string(),
    content: Joi.any(),
  })
  .unknown(true);

module.exports = {
  ARTICLES_RESPONSE_200: Joi.any().label(
    ARTICLES_RESPONSE_Label
  ),
  //Trash as in some cases there conditions are not true
  // Joi.object()
  //   .keys({
  //     articles: Joi.array().items(ARTICLE_KEYS),
  //   })
  //   .unknown(true)
  //   .label(
  //     ARTICLES_RESPONSE_Label
  //   ),

  RESPONSE_ANY: Joi.any()
};