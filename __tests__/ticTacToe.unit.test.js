const { TicTacToe } = require('../script');

describe('TicTacToe core logic', () => {
  let game;

  beforeEach(() => {
    game = new TicTacToe();
  });

  test('initial board is empty', () => {
    expect(game.board).toHaveLength(9);
    expect(game.board.every(c => c === '')).toBe(true);
    expect(game.currentPlayer).toBe('X');
  });

  test('switchPlayer toggles between X and O', () => {
    expect(game.currentPlayer).toBe('X');
    game.switchPlayer();
    expect(game.currentPlayer).toBe('O');
    game.switchPlayer();
    expect(game.currentPlayer).toBe('X');
  });

  test('detects a win correctly', () => {
    game.board = ['X','X','X','','','','','',''];
    expect(game.checkWin()).toBe(true);
    expect(game.winningCells).toEqual([0,1,2]);
  });

  test('detects a tie', () => {
    game.board = ['X','O','X','X','O','X','O','X','O'];
    expect(game.checkTie()).toBe(true);
  });
});
