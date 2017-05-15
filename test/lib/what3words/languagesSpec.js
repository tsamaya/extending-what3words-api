/* eslint no-unused-expressions: "off" */
var expect = require('chai').expect;
var what3words = require('../../../lib/what3words');

describe('what3words', function () {
  describe('#languages', function () {
    it('expects return languages', function (done) {
      what3words.languages().then(function (resolved) {
        // console.log(resolved);
        var data = JSON.parse(resolved);
        expect(data.languages).to.exist;
        expect(data.languages.length).to.be.at.least(1);
        expect(data.languages[0].code).to.exist;
        expect(data.languages[0].name).to.exist;
        expect(data.languages[0].native_name).to.exist;
        done();
      }, function (rejected) {
        console.log(rejected);
        done(rejected);
      }).catch(function (err) {
        console.log(err);
        done(err);
      });
    });
  });
});
