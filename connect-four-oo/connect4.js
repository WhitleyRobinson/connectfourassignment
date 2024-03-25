const changeBoardDims = document.querySelector('#change-dims');
const currentTurn = document.querySelector('#player-turn');
const gameContainer = document.querySelector('#game');
let htmlBoard = document.querySelector('#board');
let WIDTH = 7;
let HEIGHT = 6;
let currPlayer = 1;
const board = [];
let gameIsActive = true;

changeBoardDims.addEventListener('submit', (e) => {
  e.preventDefault();
  HEIGHT = e.target.height.value;
  WIDTH = e.target.width.value;
  destroyBoard(htmlBoard);
  makeBoard(HEIGHT, WIDTH, board);
  makeHtmlBoard(HEIGHT, WIDTH, htmlBoard);
  gameIsActive = true;
});

const destroyBoard = (boardElement) => {
  boardElement.remove();
  board.splice(0, board.length);
  const boardTable = document.createElement('table');
  boardTable.setAttribute('id', 'board');
  gameContainer.append(boardTable);
  htmlBoard = document.querySelector('#board');
}



const makeBoard = (height, width, container) => {
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row[x] = null;
    }
    container.push(row);
}
}


const makeHtmlBoard = (height, width, boardElement) => {
  const htmlBoard = boardElement;
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);


  for (let x = 0; x < width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    htmlBoard.append(top);

    for (let y = 0; y < height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${x}-${y}`);
        row.append(cell);
      }
      htmlBoard.append(row);
    }
  }


const findSpotForCol = (x) => {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    const row = board[y];
    if (!row[x]) {
      return y;
    }
  }
  return null;
}

const placeInTable = (y, x) => {
  const piece = document.createElement('div');
  piece.classList.add('piece', `p${currPlayer}`, 'fall');
  document.getElementById(`${x}-${y}`).append(piece);
}

const endGame = (msg) => {
  alert(msg);
  gameIsActive = false;
}
  
const handleClick = (evt) => {
  if (gameIsActive) {
    const x = +evt.target.id;
    const y = findSpotForCol(x);
    if (y === null) {
    return;
    }

    placeInTable(y, x);
    board[y][x] = currPlayer;

    if (checkForWin()) {
      return endGame(`Player ${currPlayer} won!`);
    }

    const boardIsFull = board.flat().every(val => val !== null);
    if (boardIsFull) {
      endGame('Tie Game!');
    }
    switchPlayers(currPlayer);
  }
}

const switchPlayers = () => {
  currPlayer = currPlayer === 1 ? 2 : 1;
  currentTurn.innerText = currPlayer;
  currentTurn.classList.toggle('p1-text-color');
  currentTurn.classList.toggle(p2-text-color);
};

    
const checkForWin = () => {
  const _win = (cells) => {
    
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(HEIGHT, WIDTH, board);
makeHtmlBoard(HEIGHT, WIDTH, board);



