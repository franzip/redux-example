var should = require('should');
var assert = require('assert');
var request = require('supertest');
var app = require('../server/server').app;

describe('Simple API Server', () => {
  it('should get all articles', (done) => {
    request(app)
      .get('/articles')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.should.be.instanceof(Array).and.have.lengthOf(2);
        done();
      });
  });

  it('should get an article', (done) => {
    request(app)
      .get('/articles/HTX9hnhFBCdn2KSGA')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.should.be.an.instanceOf(Object).and.have.properties('id', 'header', 'body', 'timestamp');
        done();
      });
  });

  it('should create an article', (done) => {
    const data = {
      header: 'Lorem Ipsum',
      body: 'Lorem Ipsum'
    };

    request(app)
      .post('/articles')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.should.be.an.instanceOf(Object).and.have.properties('id', 'header', 'body', 'timestamp');

        request(app)
        .get('/articles')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          res.body.should.be.instanceof(Array).and.have.lengthOf(3);
          done();
        });
      });
  });

  it('should remove an article', (done) => {
    request(app)
      .del('/articles/7n8rXsHo3h6MmeFWy')
      .expect(204)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        request(app)
        .get('/articles')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          res.body.should.be.instanceof(Array).and.have.lengthOf(2);
          done();
        })
      })
  });

  it('should edit an article', (done) => {
    const data = { header: 'Lorem Ipsum' };

    request(app)
      .put('/articles/HTX9hnhFBCdn2KSGA')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.should.be.an.instanceOf(Object).and.have.properties('id', 'header', 'body', 'timestamp');
        res.body.header.should.equal('Lorem Ipsum');
        done();
      })
  });
});
