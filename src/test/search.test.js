import app from '../index';
import chai from 'chai';
import request from 'supertest';
import parallel from 'async.parallel';

const expect = chai.expect;

describe('Search movie API Integration Tests', () => {
  describe('#GET /api', () => {
    it('should show api version', (done) => {
      request(app)
        .get('/api')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('version');
          done();
        });
    });
  });

  describe('#GET /api/search?keyword=XXX', () => {
    it('should get some movie data', (done) => {
      request(app)
        .get('/api/search?keyword=future')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should get 20 movies', (done) => {
      request(app)
        .get('/api/search?keyword=future')
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(20);
          done();
        });
    });

    it('should respond efficiently to concurrent requests', (done) => {
      parallel([
        (cb) => request(app).get('/api/search?keyword=future').expect(200, cb),
        (cb) => request(app).get('/api/search?keyword=future').expect(200, cb),
        (cb) => request(app).get('/api/search?keyword=future').expect(200, cb),
        (cb) => request(app).get('/api/search?keyword=future').expect(200, cb),
        (cb) => request(app).get('/api/search?keyword=future').expect(200, cb),
        (cb) => request(app).get('/api/search?keyword=future').expect(200, cb),
        (cb) => request(app).get('/api/search?keyword=future').expect(200, cb)
      ], done);
    }).timeout(50);
  });
});
