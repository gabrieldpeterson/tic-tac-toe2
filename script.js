const gameBoard = (() => {
  let playerX = true;

  const buildBoard = () => {
    // Board
    const body = document.querySelector('body');
    const board = document.createElement('div');
    board.setAttribute('id', 'board');
    body.appendChild(board);

    // Squares
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.textContent = 'square';
        square.addEventListener('click', () => {
          playerX ? square.textContent = 'X' : square.textContent = 'O';
          playerX = !playerX;
        });
        board.appendChild(square);
      }
    }
  };
  
  return { buildBoard };
})();

gameBoard.buildBoard();