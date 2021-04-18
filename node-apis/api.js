
const http = require('https');

module.exports = {
  apiCall: (httpOptions) => {
    return new Promise(function (resolve, reject) {
      var req = http.get(httpOptions, function (res) {
        
        // reject on bad status
        if (res.statusCode < 200 || res.statusCode >= 300) {
          const str = JSON.stringify({
            'code':res.statusCode,
            'message': res.statusMessage
          });
          return reject(new Error(str));
        }

        // Success
        var responseList = [];
        res.on('data', function (chunk) {
          responseList.push(chunk);
        });

        res.on('end', function () {
          try {
            responseList = JSON.parse(Buffer.concat(responseList).toString());
          } catch (e) {
            reject(e);
          }

          resolve(responseList);
        });
      })

      
      req.on('error', function (err) {
        reject(err);
      });

      req.end();
    }).catch(err=>{
      throw (err);
    });
  }
}