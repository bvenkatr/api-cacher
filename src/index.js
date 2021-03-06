/**
 * Created by narendrasisodiya on 09/06/16.
 */

module.exports = function (config) {
  var cache = {};
  return function (reqObj) {
    if (config.cache === true) {
      var hash = config.cacheHash(reqObj);
      if (cache[hash] === undefined) {
        cache[hash] = config.request(reqObj);
      }
      return cache[hash].then(function (data) {
        return new Promise(function (resolve, reject) {
          resolve(JSON.parse(JSON.stringify(data)));
        });
      });
    } else {
      return config.request(reqObj);
    }
  };
};
