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
              changeStatusText(playerX ? 'X' : 'O');
            }
          }
        });
        board.appendChild(square);
      }
    }
  };

  const changeGameStatus = (status) => {
    playGame = status;
  }

  const changeStatusText = (player) => {
    gameStatusText = document.querySelector('#statusText');
    if (playGame) {
      gameStatusText.textContent = `Playing, ${player}'s turn`;
    } else {
      gameStatusText.textContent = `${player} Wins!`;
    }
  };
  
  return { buildBoard, changeStatusText, changeGameStatus };
})();

const gameLogic = (() => {
  let squareArray = [[], [], []];

  const markSquare = (row, column, player) => {
    squareArray[row][column] = player;
  }

  const runChecks = () => {
    checkHorizontal();
  };

  const checkHorizontal = () => {
    for (let i = 0; i < 3; i++) {
      if (squareArray[i][0] === squareArray[i][1] && squareArray[i][0] === squareArray[i][2] && squareArray[i][0] !== undefined) {
        gameBoard.changeGameStatus(false);
        gameBoard.changeStatusText(squareArray[i][0]);
      }
    }
  };

  return { runChecks, markSquare };
})();

gameBoard.buildBoard();