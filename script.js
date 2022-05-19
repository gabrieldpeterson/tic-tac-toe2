const gameBoard = (() => {
  let playerX = true;
  let playGame = true;

  const buildBoard = () => {
    // Board
    const body = document.querySelector('body');
    const board = document.createElement('div');
    const gameStatus = document.createElement('h2');

    board.setAttribute('id', 'board');
    gameStatus.textContent = 'Playing';
    gameStatus.setAttribute('id', 'statusText');
    body.appendChild(board);
    body.appendChild(gameStatus);

    // Squares
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.textContent = '';
        square.addEventListener('click', () => {
          if (square.textContent === '' && playGame) {
            playerX ? square.textContent = 'X' : square.textContent = 'O';
            playerX = !playerX;
            gameLogic.runChecks();
          }
        });
        board.appendChild(square);
      }
    }
  };

  const changeStatusText = () => {
    gameStatusText = document.querySelector('#statusText');
    gameStatusText.textContent = 'hat';
  };
  
  return { buildBoard, changeStatusText, playGame };
})();

const gameLogic = (() => {
  const runChecks = () => {
    checkHorizontal();
  };

  const checkHorizontal = () => {
    gameBoard.changeStatusText();
  };

  return { runChecks };
})();

gameBoard.buildBoard();