import Board from "./board.js";

class KnightTravails {
  constructor() {
    // create new board
    this.board = new Board();
    // list of available moves
    this.xMove = [2, 1, -1, -2, -2, -1, 1, 2];
    this.yMove = [1, 2, 2, 1, -1, -2, -2, -1];
  }

  solveKT(start, end, movei = 0, board = this.board) {
    // overflow condition
    if (movei > 64) return console.log(movei);

    let xPos, yPos, endX, endY;
    let currentNode, targetNode;
    let currentNeighbours, targetNeighbours;

    xPos = start[0];
    yPos = start[1];
    endX = end[0];
    endY = end[1];

    currentNode = board.board.filter((square) => {
      return square.x == xPos && square.y == yPos;
    });

    targetNode = board.board.filter((square) => {
      return square.x == endX && square.y == endY;
    });

    // incorrect start/end
    if (currentNode.length === 0 || targetNode.length === 0)
      return console.log("Incorrect start/end");

    // print solution
    if (start[0] == end[0] && start[1] == end[1])
      return console.log({ Step: [xPos, yPos], "Step count": movei });

    // print current step and step count
    console.log({ Step: [xPos, yPos], "Step count": movei });
    currentNeighbours = currentNode[0].neighbours;
    currentNeighbours = this._nonVisitedNeighbours(currentNeighbours, board);
    targetNeighbours = targetNode[0].neighbours;
    currentNode[0].visited = true;

    // check if current node has the same neighbour as target node
    const lookup = this._compareNeighbours(
      end,
      currentNeighbours,
      targetNeighbours,
      board
    );
    if (lookup) {
      // if value is returned, take this node as next step
      start = [lookup[0].x, lookup[0].y];
      return this.solveKT(start, end, (movei += 1), board);
    } else {
      // look for another neighbour
      this.solve(
        currentNeighbours,
        targetNeighbours,
        currentNode,
        targetNode,
        board,
        movei
      );
    }
  }

  solve(currentN, targetN, cNode, tNode, board, movei) {
    // loop over current node neighbours
    for (let i = 0; i < currentN.length; i++) {
      // filter neighbour node data
      cNode = board.board.filter((node) => {
        return node.x == currentN[i][0] && node.y == currentN[i][1];
      });

      // assign neighbour neigbour's to variable
      const nextNodes = cNode[0].neighbours;

      // loop over neighbours of neighbour node to find match with target node
      for (let j = 0; j < nextNodes.length; j++) {
        // if match found - take this node and call for solution
        if (nextNodes[j][0] == tNode[0].x && nextNodes[j][1] == tNode[0].y) {
          return this.solveKT(
            currentN[i],
            [tNode[0].x, tNode[0].y],
            (movei += 1)
          );
        } else {
          // look for solution in target node neighbours
          for (let k = 0; k < targetN.length; k++) {
            if (
              nextNodes[j][0] == targetN[k][0] &&
              nextNodes[j][1] == targetN[k][1]
            ) {
              return this.solveKT(
                [targetN[k][0], targetN[k][1]],
                [tNode[0].x, tNode[0].y],
                (movei += 1)
              );
            }
          }
        }
      }
    }
    this.solveKT(
      [cNode[0].x, cNode[0].y],
      [tNode[0].x, tNode[0].y],
      (movei += 1)
    );
  }

  // helper functions
  _nonVisitedNeighbours(arr, board, newArr = []) {
    let visited;
    for (let i = 0; i < arr.length; i++) {
      let x = arr[i][0];
      let y = arr[i][1];
      visited = this._isVisited(x, y, board);
      if (visited === false) {
        newArr.push([x, y]);
      }
    }
    return newArr;
  }

  _isVisited(xPos, yPos, board) {
    const node = board.board.filter((square) => {
      return square.x == xPos && square.y == yPos;
    });
    if (node[0].visited == false) {
      return false;
    } else {
      return true;
    }
  }

  _compareNeighbours(end, currentN, targetN, board) {
    for (let i = 0; i < currentN.length; i++) {
      const foundSquare = targetN.filter((coords) => {
        return coords[0] == currentN[i][0] && coords[1] == currentN[i][1];
      });
      if (foundSquare.length > 0) {
        const node = board.board.filter((square) => {
          return square.x == foundSquare[0][0] && square.y == foundSquare[0][1];
        });
        return node;
      } else {
        for (let i = 0; i < currentN.length; i++) {
          if (currentN[i][0] == end[0] && currentN[i][1] == end[1]) {
            const node = board.board.filter((square) => {
              return square.x == end[0] && square.y == end[1];
            });
            return node;
          }
        }
      }
    }
    return null;
  }
}

const knight = new KnightTravails();
knight.solveKT([1, 1], [5, 8]);
// { Step: [ 1, 1 ], 'Step count': 0 }
// { Step: [ 2, 3 ], 'Step count': 1 }
// { Step: [ 4, 2 ], 'Step count': 2 }
// { Step: [ 6, 6 ], 'Step count': 3 }
// { Step: [ 5, 8 ], 'Step count': 4 }
