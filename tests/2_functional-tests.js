const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  test('valid puzzle string: POST request to /api/solve', function(done) {
    chai
    .request(server)
    .post('/api/solve')
    .send({
      puzzle:  '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.solution, '827549163531672894649831527496157382218396475753284916962415738185763249374928651' );
      done();
    })
  })

  test('missing puzzle string: POST request to /api/solve', function(done) {
    chai
    .request(server)
    .post('/api/solve')
    .send({})
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Required field missing');
      done();
    })
  })

  test('puzzle with invalid characters: POST request to /api/solve', function(done) {
    chai
    .request(server)
    .post('/api/solve')
    .send({
      puzzle: '82..4..6...16.h89...98315.749.157.............53..4...96.415..81..7632..3...28.51'
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Invalid characters in puzzle');
      done();
    })
  })

  test('puzzle with incorrect length: POST request to /api/solve', function(done) {
    chai
    .request(server)
    .post('/api/solve')
    .send({
      puzzle: '82..4..6...89...98315.749.157.............53..4...96.415..81..7632..3...28.51'
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
      done();
    })
  })

  test('puzzle that cannot be solved: POST request to /api/solve', function(done) {
    chai
    .request(server)
    .post('/api/solve')
    .send({
      puzzle: '822.4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Puzzle cannot be solved');
      done();
    })
  })

  test('puzzle placement with all fields: POST request to /api/check', function(done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      coordinate: 'A2',
      value: 3,
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, true);
      done();
    })
  })

  test('puzzle placement with single placement conflict: POST request to /api/check', function(done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      coordinate: 'H2',
      value: 4,
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, false);
      assert.equal(res.body.conflict.length, 1);
      done();
    })
  })

  test('puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      coordinate: 'H2',
      value: 7,
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, false);
      assert.equal(res.body.conflict.length, 2);
      done();
    })
  })

    test('puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      coordinate: 'H2',
      value: 6,
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, false);
      assert.equal(res.body.conflict.length, 3);
      done();
    })
  })

    test('puzzle placement with missing required fields: POST request to /api/check', function(done) {
    chai
    .request(server)
    .post('/api/check')
    .send({})
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Required field(s) missing');
      done();
    })
  })

    test('puzzle placement with invalid characters: POST request to /api/check', function(done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....A26914.37.',
      coordinate: 'A2',
      value: 3,
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Invalid characters in puzzle');
      done();
    })
  })

  test('puzzle placement with incorrect length: POST request to /api/check', function(done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..26914.37.',
      coordinate: 'A2',
      value: 3,
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
      done();
    })
  })

  test('puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      coordinate: 'R1',
      value: 3,
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Invalid coordinate');
      done();
    })
  })

  test(' puzzle placement with invalid placement value: POST request to /api/check', function(done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      coordinate: 'A1',
      value: 14,
    })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Invalid value');
      done();
    })
  })
  
})



