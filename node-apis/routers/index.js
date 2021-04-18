const { latestNewsRoute } = require('./latestNewsRoute.js');
const { searchNewsRoute } = require('./searchNewsRoute.js');

module.exports = {
  routes: [
    latestNewsRoute,
    searchNewsRoute,
  ],
};