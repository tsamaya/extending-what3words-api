/* eslint no-unused-expressions: "off" */
var expect = require('chai').expect;
var winston = require('winston');
winston.remove(winston.transports.Console);

process.on('unhandledRejection', function (reason) {
  console.log(reason);
});

describe('environement', function () {
  var apiKey = process.env.W3W_API_KEY;

  it('should find W3W_API_KEY', function () {
    expect(apiKey).to.exist;
  });
  it('should find non-empty W3W_API_KEY', function () {
    expect(apiKey).to.not.be.empty;
  });
});
