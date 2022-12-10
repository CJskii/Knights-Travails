class Board {
  constructor(size = 8) {
    this.size = size;
    this.board = this.newBoard();
  }
  newBoard(board = []) {
    // create board
    for (let i = 1; i <= this.size; i++) {
      for (let j = 1; j <= this.size; j++) {
        const square = new Square(i, j);
        board.push(square);
      }
    }
    return board;
  }
}

class Square {
  // square information
  constructor(xPos, yPos) {
    this.x = xPos;
    this.y = yPos;
    this.visited = false;
    this.next = null;
    this.previous = null;
  }
}

export default Board;
