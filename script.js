const gameBoard = (() => {
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
          square.textContent = 'hat';
        });
        board.appendChild(square);
      }
    }
  };
  
  return { buildBoard };
})();

gameBoard.buildBoard();