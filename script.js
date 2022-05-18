const gameBoard = (() => {
  const buildBoard = () => {
    const body = document.querySelector('body');
    const board = document.createElement('div');
    board.setAttribute('id', 'board');
    body.appendChild(board);
  };
  
  return { buildBoard };
})();

gameBoard.buildBoard();