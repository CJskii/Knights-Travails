import Board from "./board.js";

class KnightTravails {
  constructor() {
    // create new board
    this.board = new Board();
    // list of available moves
    this.moves = [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
    ];
  }

  start(position) {
    const startingSquare = this._findSquare(position);
    this._visitSquare(startingSquare);
    //console.log(startingSquare);
  }

  end(position) {
    const endSquare = this._findSquare(position);
    console.log(endSquare);
  }

  knightMoves() {
    // moves of the knight
    // check starting position
    // check ending position
    // loop through possible moves
    // calculate shortest path
    // console.log each visited square
    // console.log number of moves to get to given square
  }

  move(start, end, queue = [], path = [], count = 0) {
    if (!start) return console.log("no");
    let valid = this._isValidMove(start[0], start[1]);
    const directions = this.moves;
    console.log({
      startX: start[0],
      startY: start[1],
      endX: end[0],
      endY: end[1],
    });
    if (start[0] == end[0] && start[1] == end[1]) {
      path.push(start);
      return console.log({ count, path });
    } else if (valid === true) {
      // if move is valid visit square
      this.start(start);
      path.push(start);
      count = count + 1;
      queue = [];
      // find next move and pass to queue
      for (let i = 0; i < directions.length; i++) {
        const newX = start[0] + directions[i][0];
        const newY = start[1] + directions[i][1];
        valid = this._isValidMove(newX, newY);
        //console.log(valid);
        //console.log([newX, newY]);
        if (valid === true) {
          queue.push([newX, newY]);
          //console.log([newX, newY]);
          return this.move(queue.shift(), end, queue, path, count);
        }
      }
    } else {
      // logic if move is invalid
      const remove = queue.shift();
      console.log(remove);
    }
    console.log(queue);
    this.move(queue.shift(), end, queue, path, count);
    return console.log({ path, count, queue });
  }

  _isValidMove(posX, posY) {
    if (posX > 0 && posX <= 8 && posY > 0 && posY <= 8) {
      const square = this._findSquare([posX, posY]);
      const visited = square[0].visited;
      if (visited === false) return true;
      if (visited === true) return false;
    } else {
      return false;
    }
  }

  // helper functions
  _findSquare(position, board = this.board.board) {
    // find any square on the board
    const foundSquare = board.filter((square) => {
      if (square.x == position[0] && square.y == position[1]) {
        return square;
      }
    });
    return foundSquare;
  }

  _visitSquare(square) {
    // mark square as visited
    square[0].visited = true;
    return square;
  }

  log() {
    //console.log(this.board.board);
  }
}

const knight = new KnightTravails();
knight.log();
//knight.start([1, 1]);
//knight.end([6, 6]);
knight.move([1, 1], [1, 8]);
