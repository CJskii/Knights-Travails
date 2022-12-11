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
    this.neighbours = this.neighbours(xPos, yPos);
  }

  neighbours(xPos, yPos, arr = []) {
    let newX, newY;
    let xMove = [2, 1, -1, -2, -2, -1, 1, 2];
    let yMove = [1, 2, 2, 1, -1, -2, -2, -1];
    for (let i = 0; i < xMove.length; i++) {
      newX = xPos + xMove[i];
      newY = yPos + yMove[i];
      if (newX > 0 && newX <= 8 && newY > 0 && newY <= 8) {
        arr.push([newX, newY]);
      }
    }
    return arr;
  }
}

export default Board;
