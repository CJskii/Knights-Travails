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
    console.log(startingSquare);
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
knight.start([1, 5]);
knight.end([6, 6]);
