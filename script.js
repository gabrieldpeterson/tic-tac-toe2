const gameBoard = (() => {
  let playerX = true;
  let playGame = false;
  let playerXName = '';
  let playerOName = '';

  const buildBoard = () => {
    // Board
    const body = document.querySelector('body');
    const board = document.createElement('div');
    const gameStatus = document.createElement('h2');
    const playerXNameInput = document.createElement('input');
    const playerONameInput = document.createElement('input');
    const playButton = document.createElement('button');

    board.setAttribute('id', 'board');
    gameStatus.textContent = 'Input names, and press play to start';
    gameStatus.setAttribute('id', 'statusText');
    playerXNameInput.setAttribute('placeholder', 'Player X Name');
    playerONameInput.setAttribute('placeholder', 'Player O Name');
    playButton.textContent = 'Play';

    // Play button
    playButton.addEventListener('click', () => {
      playerXName = playerXNameInput.value === '' ? 'Player X' : playerXNameInput.value;
      playerOName = playerONameInput.value === '' ? 'Player O' : playerONameInput.value;
      playGame = true;
      changeStatusText(playerXName);
      playerXNameInput.classList.add('hide');
      playerONameInput.classList.add('hide');
      playButton.classList.add('hide');
    }, {
      once: true
    });

    body.appendChild(board);
    body.appendChild(gameStatus);
    body.appendChild(playerXNameInput);
    body.appendChild(playerONameInput);
    body.appendChild(playButton);

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
              changeStatusText(playerX ? playerXName : playerOName);
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
    if (playGame && gameLogic.getTurnCounter() !== 9) {
      gameStatusText.textContent = `${player}'s turn`;
    } else if (!playGame && gameLogic.getTurnCounter() !== 9) {
      gameStatusText.textContent = `${player} Wins!`;
    } else {
      gameStatusText.textContent = 'Draw';
    }
  };

  const getPlayerXName = () => {
    return playerXName;
  };

  const getPlayerOName = () => {
    return playerOName;
  };

  const getGameStatus = () => {
    return playGame;
  };
  
  return { buildBoard, changeStatusText, changeGameStatus, getPlayerXName, getPlayerOName, getGameStatus };
})();

const gameLogic = (() => {
  let squareArray = [[], [], []];
  let turnCounter = 0;

  const markSquare = (row, column, player) => {
    squareArray[row][column] = player;
  }

  const runChecks = () => {
    checkHorizontal();
    checkVertical();
    checkDiagonal();
    turnCounter++;
    if (turnCounter === 9 && gameBoard.getGameStatus() === true) {
      gameBoard.changeStatusText('Draw');
    }
    if (gameBoard.getGameStatus() === false) {
      const body = document.querySelector('body');
      const playAgainButton = document.createElement('button');

      playAgainButton.textContent = 'Play Again';

      playAgainButton.addEventListener('click', () => {
        location.reload();
      });

      body.appendChild(playAgainButton);
    }
  };

  const checkHorizontal = () => {
    for (let i = 0; i < 3; i++) {
      if (squareArray[i][0] === squareArray[i][1] && squareArray[i][0] === squareArray[i][2] && squareArray[i][0] !== undefined) {
        gameBoard.changeGameStatus(false);
        gameBoard.changeStatusText(squareArray[i][0] === 'X' ? gameBoard.getPlayerXName() : gameBoard.getPlayerOName());
      }
    }
  };

  const checkVertical = () => {
    for (let j = 0; j < 3; j++) {
      if (squareArray[0][j] === squareArray[1][j] && squareArray[0][j] === squareArray[2][j] && squareArray[0][j] !== undefined) {
        gameBoard.changeGameStatus(false);
        gameBoard.changeStatusText(squareArray[0][j] === 'X' ? gameBoard.getPlayerXName() : gameBoard.getPlayerOName());
      }
    }
  };

  const checkDiagonal = () => {
    if (squareArray[0][0] === squareArray[1][1] && squareArray[0][0] === squareArray[2][2] && squareArray[0][0] !== undefined) {
      gameBoard.changeGameStatus(false);
      gameBoard.changeStatusText(squareArray[0][0] === 'X' ? gameBoard.getPlayerXName() : gameBoard.getPlayerOName());
    } else if (squareArray[0][2] === squareArray[1][1] && squareArray[0][2] === squareArray[2][0] && squareArray[0][2] !== undefined) {
      gameBoard.changeGameStatus(false);
      gameBoard.changeStatusText(squareArray[0][2] === 'X' ? gameBoard.getPlayerXName() : gameBoard.getPlayerOName());
    }
  };

  const getTurnCounter = () => {
    return turnCounter;
  };

  return { runChecks, markSquare, getTurnCounter };
})();

gameBoard.buildBoard();