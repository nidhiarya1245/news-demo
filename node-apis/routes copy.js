// const http = require('https');
const Joi = require('joi');
const {getLatestnews} = require('./controller/latestnews.js');
//https://newsapi.org/v2/top-headlines?country=us&apiKey=b56244bb5e8f4806a5fcd35c35d57f03
// var options = {
//   host: 'www.random.org',
//   path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
// };
// var apiOptions = {
//   host: 'newsapi.org',
//   path: '/v2/top-headlines?country=us&apiKey=b56244bb5e8f4806a5fcd35c35d57f03'
// };

// getRecenttNews = function (options) {
  // return new Promise(function (resolve, reject) {
  //   var req = http.get(options, function (res) {
  //     // reject on bad status
  //     if (res.statusCode < 200 || res.statusCode >= 300) {
  //       return reject(new Error('statusCode=' + res.statusCode));
  //     }
  //     // cumulate data
  //     var lastestNewsList = [];
  //     res.on('data', function (chunk) {
  //       lastestNewsList.push(chunk);
  //     });
  //     // resolve on end
  //     res.on('end', function () {
  //       try {
  //         lastestNewsList = JSON.parse(Buffer.concat(lastestNewsList).toString());
  //       } catch (e) {
  //         reject(e);
  //       }
  //       resolve(lastestNewsList);
  //     });
  //   });

  //   // reject on request error
  //   req.on('error', function (err) {
  //     // This is not a "Second reject", just a different sort of failure
  //     reject(err);
  //   });

  //   // IMPORTANT
  //   req.end();
  // });
// }
// callback = function(response) {
//   var result = ''
//   response.on('data', function (chunk) {
//     result += chunk;
//   });

//   response.on('end', function (res) {
//     result = JSON.parse(result);
//     // console.log('str ', JSON.parse(str));
//   });
//   return result;
// }

let service = Joi.object().keys({
  source: Joi.object().unknown(true),
  author: Joi.any(),
  title: Joi.string(),
  description: Joi.any(),
  publishedAt: Joi.string(),
  content: Joi.any(),
}).unknown(true);

// "source": {
//   "id": "cnn",
//   "name": "CNN"
// },
// "author": "Alta Spells, CNN",
// "title": "Multiple people with gunshot wounds after shooting at FedEx facility in Indianapolis, police say - CNN ",
// "description": "Multiple people with gunshot wounds have been brought to local hospitals after a shooting at a FedEx facility in Indianapolis, according to Officer Genae Cook, a spokesperson for the Indianapolis Metropolitan Police Department.",
// "url": "https://www.cnn.com/2021/04/16/us/indianapolis-shooting-fedex-facility/index.html",
// "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/210416010327-01-indianapolis-fedex-shooting-0416-restricted-super-tease.jpg",
// "publishedAt": "2021-04-16T05:47:00Z",
// "content": "(CNN)Multiple people with gunshot wounds have been brought to local hospitals after a shooting at a FedEx facility in Indianapolis, according to Officer Genae Cook, a spokesperson for the Indianapoli… [+1739 chars]"
// }

module.exports = {
  latestNewsRoute: [{
    method: 'GET',
    path: '/getLatestNews/',
    options: {
      handler: (req, res) => {
        // http.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=b56244bb5e8f4806a5fcd35c35d57f03', callback).end();
        // var resultt = http.request(options, callback).end();
        return getLatestnews();//getRecenttNews(apiOptions);
      },
      description: 'Get Latest news',
      notes: 'Returns Latest news',
      tags: ['api'], // ADD THIS TAG
      response: {
        status: {
          200: Joi.object().keys({
            articles: Joi.array().items(service)
          }).unknown(true).label('Response keys: source,author,title,description,publishedAt,content '),
          400: Joi.any()
        }
      },
    },
  }]
};