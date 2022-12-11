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
    if (movei > 64) return console.log(movei);
    if (start[0] == end[0] && start[1] == end[1])
      return console.log({ steps: movei });
    let xPos, yPos, endX, endY;
    let currentNode, previousNode, targetNode;
    let currentNeighbours, previousNeighbours, targetNeighbours;

    xPos = start[0];
    yPos = start[1];
    endX = end[0];
    endY = end[1];

    console.log({ xPos, yPos, endX, endY });

    currentNode = board.board.filter((square) => {
      return square.x == xPos && square.y == yPos;
    });

    targetNode = board.board.filter((square) => {
      return square.x == endX && square.y == endY;
    });

    currentNeighbours = currentNode[0].neighbours;
    targetNeighbours = targetNode[0].neighbours;
    currentNode[0].visited = true;

    // check if current node has the same neighbour as target node
    const lookup = this.compareNeighbours(
      end,
      currentNeighbours,
      targetNeighbours,
      board
    );
    if (lookup) {
      //console.log("from the lookup");
      start = [lookup[0].x, lookup[0].y];
      return this.solveKT(start, end, (movei += 1), board);
      // pick this node as next step
    } else {
      //console.log("from else");
      // select neighbour with closest value to target
      //console.log(currentNeighbours);
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
    //console.log({ currentN, targetN });
    //console.log({ cNode, tNode });
    // loop over current node neighbours
    for (let i = 0; i < currentN.length; i++) {
      // retrieve neighbour node data
      cNode = board.board.filter((node) => {
        return node.x == currentN[i][0] && node.y == currentN[i][1];
      });
      //console.log(cNode);
      // assign neighbour neigbour's to variable
      const nextNodes = cNode[0].neighbours;
      //console.log({ neighbours: nextNodes });
      // loop over neighbours of neighbour node to find match with target node
      for (let j = 0; j < nextNodes.length; j++) {
        if (nextNodes[j][0] == tNode[0].x && nextNodes[j][1] == tNode[0].y) {
          // travel to this node and call for solution
          //console.log("end it now");
          return this.solveKT(
            currentN[i],
            [tNode[0].x, tNode[0].y],
            (movei += 1)
          );
        }
      }
    }
    //console.log("from the end");
    this.solveKT(
      [cNode[0].x, cNode[0].y],
      [tNode[0].x, tNode[0].y],
      (movei += 1)
    );
  }

  compareNeighbours(end, currentN, targetN, board) {
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
        //console.log({ currentN, end });
      }
    }
    return null;
  }
}

const knight = new KnightTravails();
//console.log(knight);
knight.solveKT([1, 1], [3, 3]);
