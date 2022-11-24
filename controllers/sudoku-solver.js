class SudokuSolver {

  getGrid(puzzleString) {
    //replace dots for zeros
    const newString = puzzleString.replace(/\./g, 0);
    //turn string into array of 81 elements
    let array = [...newString]
    // slice array into 9 arrays of 9 elements to get a grid[9][9]
    let grid = [];
    for (let i = 0; i < array.length; i += 9) {
      const gridElement = array.slice(i, i + 9);
      grid.push(gridElement)
    }
    return grid;
  }

  getGridCoordinate(coordinate) {
    const rowList = ["A", "B", "C", "D", "E", "F", "G", "H", 'I'];
    const colList = [ "1", "2", "3", "4", "5", "6" , "7", "8", "9"];
    const number = ["0", "1", "2", "3", "4", "5", "6" , "7", "8"];

    //transform coordinate in grid coordinate (0-8)(0-8)
    const newRow = number[rowList.indexOf(coordinate[0].toUpperCase())]
    const newCol = number[colList.indexOf(coordinate[1])]
    
    return newRow+newCol
  }

  
  checkCellPlacement(grid, row, col, value) {
    // Check if we find the same num in the similar row , we return false
    if (grid[row][col] == value)
            return true;
  }
  
  checkRowPlacement(grid, row, col, value) {
    // Check if we find the same num in the similar row , we return false
    for(let x = 0; x <= 8; x++)
        if (grid[row][x] == value)
            return false;
  }

  checkColPlacement(grid, row, col, value) {
    // Check if we find the same num in the similar column, we return false
    for(let x = 0; x <= 8; x++)
        if (grid[x][col] == value)
            return false;
  }

  checkRegionPlacement(grid, row, col, value) {
  // Check if we find the same num in the particular 3*3 matrix, we return      false
    let startRow = row - row % 3,
        startCol = col - col % 3;
         
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (grid[i + startRow][j + startCol] == value)
                return false;
 
  }

  // https://www.geeksforgeeks.org/sudoku-backtracking-7/
  /* Takes a partially filled-in grid and attempts to assign values to all       unassigned locations in such a way to meet the requirements for Sudoku         solution (non-duplication across rows, columns, and boxes) */
  solveSudoku(grid, row, col)
  {
     
    /* If we have reached the 8throw and 9th column (0 indexed matrix) ,
       we are returning true to avoid further backtracking */
    if (row == 8 && col == 9)
        return true;
 
    // Check if column value  becomes 9, we move to next row and column start     from 0
    if (col == 9)
    {
        row++;
        col = 0;
    }
 
    // Check if the current position of the grid already contains value >0,        we iterate for next column
    if (grid[row][col] != 0)
        return this.solveSudoku(grid, row, col + 1);
 
    for(let value = 1; value < 10; value++)
    {
         
        // Check if it is safe to place the num (1-9)  in the given row ,col -       >we move to next column
        if (this.checkRowPlacement(grid, row, col, value) != false && this.checkColPlacement(grid, row, col, value) != false && this.checkRegionPlacement(grid, row, col, value) != false)
        {
            /*  assigning the num in the current (row,col)  position of the g             grid and assuming our assigned num in the position is correct */
            grid[row][col] = value;
 
            // Checking for next possibility with next column
            if (this.solveSudoku(grid, row, col + 1))
                return true;
        }
         
        /* removing the assigned num , since our assumption was wrong , and           we go for next assumption with diff num value   */
        grid[row][col] = 0;
    }
    return false;
}

  solve(puzzleString) {
    if (!(/^[0-9\.]*$/).test(puzzleString)) {
      return false;
    }

    if (puzzleString.length != 81) {
      return false;
    }
    
    //turn string into grid[9][9]
    const grid = this.getGrid(puzzleString);
    //get solution for given string
    const gridSolution = this.solveSudoku(grid, 0, 0);
    //if grid is not valid
    if (!gridSolution) {
      return false;
    }
    //if grid is valid, turn it back into a string
    const solutionString = [];
    grid.forEach((array) => {solutionString.push(array.join(""))})
    return solutionString.join("");
  }
}

module.exports = SudokuSolver;

