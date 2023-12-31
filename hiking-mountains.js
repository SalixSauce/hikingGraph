function findPeak(matrix) {
  let highest = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let k = 0; k < matrix[0].length; k++) {
      if (matrix[i][k] > highest) {
        highest = matrix[i][k];
      }
    }
  }

  return highest;
}

function findStarts(matrix) {
  let starts = [];

  // Top Row
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix[0][i] == 0) {
      starts.push([0, i]);
    }
  }

  // Bottom Row
  for (let i = 0; i < matrix[matrix.length - 1].length; i++) {
    if (matrix[matrix.length - 1][i] == 0) {
      starts.push([matrix.length - 1, i]);
    }
  }

  // Left except first and last
  for (let i = 1; i < matrix.length - 1; i++) {
    if (matrix[i][0] == 0) {
      starts.push([i, 0]);
    }
  }

  // Right except first and last
  for (let i = 1; i < matrix.length - 1; i++) {
    if (matrix[i][matrix[0].length - 1] == 0) {
      starts.push([i, matrix[0].length - 1]);
    }
  }

  return starts;
}

function findNeighbors(node, matrix) {
  // Don't forget to include diagonal neighbors!!!

  // Your code here
  let [row, col] = node;
  let neighbors = [];
  let direction = [
    [-1, 0], //top
    [1, 0], // bottom
    [0, -1], // left
    [0, 1], // right
    [-1, -1], //top left
    [-1, 1], //top right
    [1, 1], //bottom right
    [1, -1] //bottom left
  ]

  for (const [rowChange, colChange] of direction) {
    const newRow = row + rowChange;
    const newCol = col + colChange;

    if(
      newRow >= 0 && newRow < matrix.length &&
      newCol >=0 && newCol < matrix[newRow].length &&
      Math.abs(matrix[newRow][newCol] - matrix[row][col]) <= 1
    ) {
      neighbors.push([newRow, newCol])
    }
  }
  // //north
  // if (row - 1 >= 0 && 
  //   Math.abs(matrix[row - 1][col] - matrix[row][col]) <= 1) {
  //   neighbors.push([row - 1, col]);
  // }
  // //South
  // if (row + 1 >= 0 && 
  //   Math.abs(matrix[row + 1][col] - matrix[row][col]) <= 1) {
  //   neighbors.push[(row + 1, col)];
  // }
  // //east
  // if (
  //   col + 1 < matrix[row].length &&
  //   Math.abs(matrix[row][col + 1] - matrix[row][col]) <= 1
  // ) {
  //   neighbors.push([row, col + 1]);
  // }

  // //west
  // if (col - 1 >= 0 && 
  //   Math.abs(matrix[row][col - 1] - matrix[row][col]) <= 1) {
  //   neighbors.push([row, col - 1]);
  // }

  // //NorthEast
  // if (
  //   row - 1 >= 0 &&
  //   col + 1 < matrix[row - 1].length &&
  //   Math.abs(matrix[row - 1][col + 1] - matrix[row][col]) <= 1
  // ) {
  //   neighbors.push([row - 1, col + 1]);
  // }
  // //SouthEast
  // if (
  //   row + 1 < matrix.length &&
  //   col + 1 < matrix[row + 1].length &&
  //   Math.abs(matrix[row + 1][col - 1] - matrix[row][col]) <= 1
  // ) {
  //   neighbors.push([row + 1, col - 1]);
  // }
  // //NorthWest
  // if (
  //   row - 1 >= 0 &&
  //   col - 1 >= 0 &&
  //   Math.abs(matrix[row + 1][col - 1] - matrix[row][col]) <= 1
  // ) {
  //   neighbors.push([row + 1, col - 1]);
  // }
  // //SouthWest
  // if (
  //   row + 1 < matrix.length &&
  //   col - 1 >= 0 &&
  //   Math.abs(matrix[row - 1][col - 1] - matrix[row][col]) <= 1
  // ) {
  //   neighbors.push([row - 1, col - 1]);
  // }
  return neighbors
}

function pathTraversal(node, matrix, visited, peak) {
  // Your code here
  let queue = [node];
  visited.add(`${node}`)

  while(queue.length) {
    let curr = queue.shift()
    for(const neighbor of findNeighbors(curr, matrix)) {
      let [row, col] = neighbor;
      if(matrix[row][col] === peak) {
        return true
      } else if(!visited.has(`${neighbor}`)) {
        visited.add(`${neighbor}`)
        queue.push(neighbor)
      }
    }
  }
  return false
}

function identifyPath(mountain) {
  // Find the peak
  let peak = findPeak(mountain)
  // Find the start
  let starts = findStarts(mountain)


  // Traverse from the starts and try to get to the top
  for(const start of starts) {
    if(pathTraversal(start, mountain, new Set(), peak)) {
      return start
    }
  }
  // Your code here
}

// Uncomment for local testing

// // Example 0
// const mountain_0 = [
//     [1, 2, 4],
//     [4, 5, 9],
//     [5, 7, 6]
// ];

// console.log(findNeighbors([2,0], mountain_0)) // <- Expect '[ [ 1, 0 ], [ 1, 1 ] ]'

// // Example 1
// const mountain_1 = [
//         [1, 0, 1, 1],
//         [2, 3, 2, 1],
//         [0, 2, 4, 1],
//         [3, 2, 3, 1]
// ];

// test_visited = new Set()
// console.log(pathTraversal([0, 1], mountain_1, test_visited, 4)) // <- Expect 'true
// console.log(identifyPath(mountain_1)) // <- Expect '[ 0, 1 ]'

// // Example 2
// const mountain_2 = [
//         [0, 2, 1, 1],
//         [2, 2, 3, 1],
//         [1, 1, 1, 1],
//         [1, 0, 1, 1]
// ];

// console.log(identifyPath(mountain_2)) // <- Expect '[ 3, 1 ]'

// // Example 3
// const mountain_3 = [
//         [0, 1, 2, 0],
//         [5, 1, 3, 2],
//         [4, 1, 2, 1],
//         [3, 4, 3, 1]
// ];

// console.log(identifyPath(mountain_3)) // <- Expect '[ 0, 0 ]'

/*************DO NOT MODIFY UNDER THIS LINE ***************/

module.exports = [identifyPath, findNeighbors, pathTraversal];
