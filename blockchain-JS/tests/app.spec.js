const request = require('supertest');
let app = require('../app');
describe('GET /', function () {
 it('should return 200', function (done) {
   request(app)
     .get('/')
     .expect(200, done)
 });
});

describe('GET /data', function () {
  it('should return 200', function (done) {
    request(app)
      .get('/data')
      .expect(200, done)
  });
 });
