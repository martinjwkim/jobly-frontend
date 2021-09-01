let player1 = document.querySelector('#player1')

class Game {
  constructor(p1, p2, boardSize = 10){
    this.p1 = p1
    this.p2 = p2
    this.currentPlayer = p1
    this.boardSize = boardSize
    this.pieces = [2,3,3,4,5]
    this.makeBoard()
  }

  makeBoard() {
    let board = new Array(this.boardSize)
      .fill(null)
      .map(row => Array(this.boardSize)
        .fill(0))

    for(let piece of this.pieces) {
      this.setPiece(piece, board);  
    }

    this.board = board;
  }

  setPiece(pieceSize, board) {
    let direction, xDir, yDir, xMaxStart, yMaxStart, xStart, yStart;

    do {
      direction = Math.round(Math.random());
      xDir = direction === 0 ? 1 : 0;
      yDir = direction === 1 ? 1 : 0;
      xMaxStart = board[0].length - pieceSize * xDir;
      yMaxStart = board.length - pieceSize * yDir;
      xStart = Math.floor(Math.random() * xMaxStart);
      yStart = Math.floor(Math.random() * yMaxStart)
    } while (!this.isValidPosition(xStart, yStart, xDir, yDir, pieceSize, board))
    
    for(let i = 0; i < pieceSize; i++) {
      const xNext = xStart + xDir * i;
      const yNext = yStart + yDir * i;
      board[yNext][xNext] = 1;
    }
  }

  isValidPosition(x,y, xDir, yDir, pieceSize, board) {
    
    for(let i = 0; i < pieceSize; i++) {
      const xNext = x + xDir * i;
      const yNext = y + yDir * i;
      if(board[yNext][xNext] === 1) return false;
    }

    return true;
  }

  makeHTMLBoard(boardSelector, board) {
    let rowLabel = 'A';

    boardSelector.addEventListener('click', e => {
      console.log(e.target.closest('td').id)
      this.handleClick(e.target.closest('td'))
    })

    let firstRow = document.createElement('tr');
    for(let i = 0; i <= board[0].length; i++) {
      let col = document.createElement('td')
      if(i !== 0) col.innerText = i;
      firstRow.appendChild(col);
    }
  
    boardSelector.appendChild(firstRow)
  
    for(let i = 0; i < board.length; i++) {
      let currentRow = document.createElement('tr');
      let firstCol = document.createElement('td');
      
      firstCol.innerText = String.fromCharCode(rowLabel.charCodeAt() + i)
      currentRow.appendChild(firstCol);

      for(let j = 0; j < board[0].length; j++) {
        let col = document.createElement('td');
      
        col.id = `${i}-${j}`

        currentRow.appendChild(col);
      }
      boardSelector.appendChild(currentRow);
    }
  }

  checkForWin() {

  }

  handleClick (cell) {
    const coordinate = cell.id
    const [y, x] = coordinate.split('-')

    this.handleMove(this.currentPlayer, x, y)

    this.checkForWin()
    
    //switch players
    this.currentPlayer = this.currentPlayer === this.p1 ? this.p2 : this.p1
  }

  handleMove(player, y, x) {
    const opponent = player === this.p1 ? this.p2 : this.p1

    document.getElementById(`${x}-${y}`).style.backgroundColor = this.board[x][y] ? 'red' : 'grey'
  }

  endGame () {

  }

}

class Player {
  constructor(){
    this.board = board;
  }
}

const board = new Array(10).fill(null).map(row => Array(10).fill(0));

let game = new Game();

game.makeHTMLBoard(p1, board)
game.makeHTMLBoard(p2, board)