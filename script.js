const gameBoard = (() => {
  let playerX = true;
  let playGame = true;

  const buildBoard = () => {
    // Board
    const body = document.querySelector('body');
    const board = document.createElement('div');
    const gameStatus = document.createElement('h2');

    board.setAttribute('id', 'board');
    gameStatus.textContent = 'Playing, X\'s turn';
    gameStatus.setAttribute('id', 'statusText');
    body.appendChild(board);
    body.appendChild(gameStatus);

    // Squares
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('id', `${i}${j}`);
        square.textContent = '';

        // Square click behavior
        square.addEventListener('click', (e) => {
          if (square.textContent === '' && playGame) {
            playerX ? square.textContent = 'X' : square.textContent = 'O';
            playerX = !playerX;

            const squares = e.target.id.split('');

            gameLogic.markSquare(squares[0], squares[1], square.textContent);
            gameLogic.runChecks();
            if (playGame) {
              changeStatusText();
            }
          }
        });
        board.appendChild(square);
      }
    }
  };

  const changeStatusText = () => {
    gameStatusText = document.querySelector('#statusText');
    if (playerX && playGame) {
      gameStatusText.textContent = 'Playing, X\'s turn';
    } else if (!playerX && playGame) {
      gameStatusText.textContent = 'Playing, O\'s turn';
    }
  };
  
  return { buildBoard, changeStatusText, playGame };
})();

const gameLogic = (() => {
  let squareArray = [[], [], []];

  const markSquare = (row, column, player) => {
    squareArray[row][column] = player;
  }

  const runChecks = () => {
    checkHorizontal('X');
    checkHorizontal('O');
  };

  const checkHorizontal = (player) => {
    for (let i = 0; i < 3; i++) {
      // use array.every for this
    }
  };

  return { runChecks, markSquare };
})();

gameBoard.buildBoard();