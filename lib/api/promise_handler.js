var logger = require('winston');

module.exports = {
  /**
   * [description]
   * @param  {Promise} p        [description]
   * @param  {Object} response represents the HTTP response
   */
  sendPromiseResponse: function (p, response) {
    p.then(function (data) {
      try {
        response.send(JSON.parse(data));
      } catch (e) {
        console.log(e);
        response.send(e);
      }
    }, function (rejected) {
      logger.log('error', rejected);
      response.send(rejected);
    }).catch(function (err) {
      logger.log('error', err);
      response.send(err);
    });
  }
};
