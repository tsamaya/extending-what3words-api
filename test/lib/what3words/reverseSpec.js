/* eslint no-unused-expressions: "off" */
var expect = require('chai').expect;
var what3words = require('../../../lib/what3words');

describe('what3words', function () {
  var validate = require('./validate');

  var ERRORS = what3words.errors;

  describe('#reverse input params', function () {
    it('expects to throw with no params', function () {
      var fn = function () {
        what3words.reverse();
      };
      expect(fn).to.throw;
      expect(fn).to.throw(ERRORS.UNDEFINED_QUERY);
    });
    it('expects to throw with null', function () {
      var fn = function () {
        what3words.reverse(null);
      };
      expect(fn).to.throw;
      expect(fn).to.throw(ERRORS.UNDEFINED_QUERY);
    });
  });

  describe('#reverse fails', function () {
    it('expects to fail with no coords', function (done) {
      what3words.reverse({}).then(function (resolved) {
        // console.log(resolved);
        var data = JSON.parse(resolved);
        expect(data).to.exist;
        expect(data.code).to.exist;
        expect(data.code).to.equal(400);
        expect(data.message).to.exist;
        expect(data.message).to.equal('/reverse: missing required parameter "coords"');
        done();
      }, function (rejected) {
        console.log(rejected);
        done(rejected);
      }).catch(function (err) {
        done(err);
      });
    });

    it('expects to fail with invalid coords', function (done) {
      what3words.reverse({
        coords: 'abc'
      }).then(function (resolved) {
        // console.log(resolved);
        var data = JSON.parse(resolved);
        expect(data).to.exist;
        expect(data.status).to.exist;
        expect(data.status.status).to.exist;
        expect(data.status.status).to.equal(200);
        expect(data.status.code).to.exist;
        expect(data.status.code).to.equal(104);
        expect(data.status.message).to.exist;
        expect(data.status.message).to.equal('The \'coords\' parameter is invalid or missing coordinates');
        done();
      }, function (rejected) {
        console.log(rejected);
        done(rejected);
      }).catch(function (err) {
        done(err);
      });
    });
  });

  describe('#reverse success', function () {
    var coords = '51.521251,-0.203586';

    it('should reverse [' + coords + '] in `geojson`', function (done) {
      var params = {
        coords: coords,
        format: 'geojson'
      };
      what3words.reverse(params).then(function (resolved) {
        // console.log(resolved);
        validate.validateGeoJSONPayload(JSON.parse(resolved));
        done();
      }, function (rejected) {
        console.log('rejected', rejected);
        done(rejected);
      }).catch(function (err) {
        console.log('catch', err);
        done(err);
      });
    });
  });
});
