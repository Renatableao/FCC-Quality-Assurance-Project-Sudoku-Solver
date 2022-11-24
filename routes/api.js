'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      const coordinate = req.body.coordinate;
      const value = req.body.value;
      const conflict = [];

      //if no string input
      if (!puzzle || !value || !coordinate) {
        res.json({ error: 'Required field(s) missing' });
        return;
      }
      //if string is not 81 characters
      if (puzzle.length != 81) {
        res.json({error: 'Expected puzzle to be 81 characters long'});
        return;
      }
      //if string has other char than digit and dot
      if (!(/^[0-9\.]*$/).test(puzzle)) {
        res.json({ error: 'Invalid characters in puzzle' });
        return;
      }
      //if coordinate is not valid (A-I)(1-9)
      if (!(/^[A-I][1-9]$/i).test(coordinate)) {
        res.json({ error: 'Invalid coordinate' })
        return;
      }

      //transform given coordinate in grid cell row+col
      const gridCoordinate = solver.getGridCoordinate(coordinate) ;
      
      //if value input is not digit 1-9
      if (!(/^[1-9]$/).test(value)) {
        res.json({ error: 'Invalid value' })
        return;
      }

      //get grid array from puzzleString
      const grid = solver.getGrid(puzzle);

      //if value is already in given grid cell
      if (solver.checkCellPlacement(grid, gridCoordinate[0], gridCoordinate[1], value)) {
        res.json({ valid: true})
        return;
      }

       // if placement has conflict in given row
      if (solver.checkRowPlacement(grid, gridCoordinate[0], gridCoordinate[1], value) == false) {
         conflict.push("row"); 
      }
       // if placement has conflict in given col
      if (solver.checkColPlacement(grid, gridCoordinate[0], gridCoordinate[1], value) == false) {
         conflict.push("column"); 
      }
       // if placement has conflict in given region
      if (solver.checkRegionPlacement(grid, gridCoordinate[0], gridCoordinate[1], value) == false) {
         conflict.push("region"); 
      }
      
      //if there was no conflict
      if (conflict.length == 0) {
      res.json({ valid: true});
      }
      //if there was conflict display which ones
      else {
      res.json({ valid: false, conflict: conflict})
      }

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      if (!puzzle) {
        res.json({ error: 'Required field missing' });
        return;
      }
      if (puzzle.length != 81) {
        res.json({error: 'Expected puzzle to be 81 characters long'});
        return;
      }
      if (!(/^[0-9\.]*$/).test(puzzle)) {
        res.json({ error: 'Invalid characters in puzzle' });
        return;
      }
       
        let solvedPuzzle = solver.solve(puzzle);
        if (!solvedPuzzle) {
          res.json({ error: 'Puzzle cannot be solved' })
        }
        else {
          res.json({solution: solvedPuzzle})
        }
      
});
}
