'use strict';

var superagent = module.exports = require('superagent');
var Request = superagent.Request;

Request.prototype.promise = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.end(function(err, res) {
      if (typeof res !== 'undefined' && res.status >= 400) {
        reject({
          status: res.status,
          res: res,
          error: res.error
        });
      } else if (err) {
        reject({
          error: err
        });
      } else {
        resolve(res);
      }
    });
  });
};
