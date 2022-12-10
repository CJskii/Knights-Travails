import { validate } from "schema-utils";
import Board from "./board.js";

class KnightTravails {
  constructor() {
    // create new board
    this.board = new Board();
    // list of available moves
    this.xMove = [2, 1, -1, -2, -2, -1, 1, 2];
    this.yMove = [1, 2, 2, 1, -1, -2, -2, -1];
    this.size = this.board.size;
  }

  tour(start, end, count = 0, board, queue = [], path = []) {
    if (!start || !end) return console.log("Provide valid start/end value");
    const xPos = start[0];
    const yPos = start[1];
    const endX = end[0];
    const endY = end[1];
    if (!board) {
      board = new Board();
      const square = board.board.filter((square) => {
        if (square.x == xPos && square.y == yPos) {
          square.previous = "root";
        }
        return square.x == xPos && square.y == yPos;
      });
    }

    if (xPos == endX && yPos == endY) return console.log({ count, path });
    else {
      let newX, newY;
      // look for possible moves
      for (let i = 0; i < this.xMove.length; i++) {
        newX = xPos + this.xMove[i];
        newY = yPos + this.yMove[i];
        if (this.validateMove(newX, newY, board.board)) {
          // push available moves to the queue
          queue.push([newX, newY]);
        }
      }
      // visit starting square, increase count and push it as a path
      path.push([xPos, yPos]);
      count = count + 1;
      const visit = board.board.filter((square) => {
        if (square.x == xPos && square.y == yPos) {
          square.visited = true;
        }
        return square.x == xPos && square.y == yPos;
      });
      // check if move in the queue will fulfil base condition
      for (let i = 0; i < queue.length; i++) {
        newX = queue[i][0];
        newY = queue[i][1];
        if (newX == endX && newY == endY) {
          // push new move to the path
          path.push([newX, newY]);
          // clear queue and call recursively to solve knight's tour
          this.tour([newX, newY], end, (count += 1), board, (queue = []), path);
        }
      }

      if (queue.length) {
        this.tour(queue.shift(), end, count, board, queue, path);
      }
    }
  }

  validateMove(x, y, board) {
    if (x > 0 && x <= 8 && y > 0 && y <= 8) {
      const filtered = board.filter((square) => {
        return square.x == x && square.y == y;
      });
      if (filtered[0].visited === false) {
        return true;
      } else {
        return null;
      }
    } else return null;
  }
}

const knight = new KnightTravails();
//console.log(knight);
//knight.log();
knight.tour([1, 1], [3, 3]);
