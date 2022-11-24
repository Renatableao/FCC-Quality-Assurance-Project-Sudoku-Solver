const chai = require('chai');
const assert = chai.assert;

let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
let grid = [[
    '1', '0', '5',
    '0', '0', '2',
    '0', '8', '4'
  ],
  [
    '0', '0', '6',
    '3', '0', '1',
    '2', '0', '7'
  ],
  [
    '0', '2', '0',
    '0', '5', '0',
    '0', '0', '0'
  ],
  [
    '0', '9', '0',
    '0', '1', '0',
    '0', '0', '0'
  ],
  [
    '8', '0', '2',
    '0', '3', '6',
    '7', '4', '0'
  ],
  [
    '3', '0', '7',
    '0', '2', '0',
    '0', '9', '0'
  ],
  [
    '4', '7', '0',
    '0', '0', '8',
    '0', '0', '1'
  ],
  [
    '0', '0', '1',
    '6', '0', '0',
    '0', '0', '9'
  ],
  [
    '2', '6', '9',
    '1', '4', '0',
    '3', '7', '0'
  ]
];
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {

  suite('Solver tests', () => {

      test('Logic handles a valid puzzle string of 81 characters', function(done) {
      assert.equal(solver.solve('827549163531672894649831527496157382218396475753284916962415738185763249374928651'), "827549163531672894649831527496157382218396475753284916962415738185763249374928651");
      done();
    }) 

     test('handles a puzzle string with invalid characters', function(done) {
      let InvalidpuzzleString = '1a5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.solve(InvalidpuzzleString), false);
      done();
    }) 

    test('handles a puzzle string that is not 81 characters in length', function(done) {
      let InvalidpuzzleString = '84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.solve(InvalidpuzzleString), false);
      done();
    }) 

     test('handles a valid row placement', function(done) {
        let gridCoordinate = '01';
        let value = 3;
      assert.equal(solver.checkRowPlacement(grid, gridCoordinate[0], gridCoordinate[1], value), undefined);
      done();
    }) 

    test('handles a invalid row placement', function(done) {
        let gridCoordinate = '71';
        let value = 6;
      assert.equal(solver.checkRowPlacement(grid, gridCoordinate[0], gridCoordinate[1], value), false);
      done();
    }) 

     test('handles a valid column placement', function(done)     {
        let gridCoordinate = '71';
        let value = 3;
      assert.equal(solver.checkColPlacement(grid, gridCoordinate[0], gridCoordinate[1], value), undefined);
      done();
    }) 

    test('handles a invalid col placement', function(done) {
        let gridCoordinate = '71';
        let value = 6;
      assert.equal(solver.checkColPlacement(grid, gridCoordinate[0], gridCoordinate[1], value), false);
      done();
    }) 

     test('handles a valid region (3x3 grid) placement', function(done)     {
        let gridCoordinate = '71';
        let value = 3;
      assert.equal(solver.checkColPlacement(grid, gridCoordinate[0], gridCoordinate[1], value), undefined);
      done();
    }) 

    test('handles a invalid region (3x3 grid) placement', function(done)     {
        let gridCoordinate = '71';
        let value = 6;
      assert.equal(solver.checkColPlacement(grid, gridCoordinate[0], gridCoordinate[1], value), false);
      done();
    })

    test('Valid puzzle strings pass the solver', function(done) {
      assert.equal(solver.solve(puzzleString), "135762984946381257728459613694517832812936745357824196473298561581673429269145378");
      done();
    }) 

     test('Invalid puzzle strings fail the solver', function(done) {
      let InvalidpuzzleString = '155..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.solve(InvalidpuzzleString), false);
      done();
    }) 
    
    test('Solver returns the expected solution for an incomplete puzzle', function(done) {
      assert.equal(solver.solve('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), "568913724342687519197254386685479231219538467734162895926345178473891652851726943");
      done();
    }) 
  })  
  });
 
