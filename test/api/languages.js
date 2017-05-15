/* eslint no-unused-expressions: "off" */
var expect = require('chai').expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server');

describe('api', function () {
  describe('#proxying what3words', function () {
    chai.use(chaiHttp);

    it('#languages', function (done) {
      chai.request(server)
        .get('/api/languages')
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.exist;
            // console.log(res.body);
            var data = res.body;
            expect(data.languages).to.exist;
            expect(data.languages.length).to.be.at.least(1);
            expect(data.languages[0].code).to.exist;
            expect(data.languages[0].name).to.exist;
            expect(data.languages[0].native_name).to.exist;
            done();
          }
        });
    });
  });
});
