/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
const { TicTacToe } = require('../script');

describe('TicTacToe DOM integration', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
    // create a game instance which will hook event listeners
    new TicTacToe();
  });

  test('clicking a cell places the current player symbol', () => {
    const cell0 = document.querySelector('[data-index="0"]');
    cell0.click();
    expect(cell0.textContent).toBe('X');
  });

  test('winning highlights cells and updates status', () => {
    // simulate moves leading to X win at top row
    const c0 = document.querySelector('[data-index="0"]');
    const c1 = document.querySelector('[data-index="1"]');
    const c2 = document.querySelector('[data-index="2"]');

    c0.click(); // X
    c3 = document.querySelector('[data-index="3"]');
    c3.click(); // O
    c1.click(); // X
    c4 = document.querySelector('[data-index="4"]');
    c4.click(); // O
    c2.click(); // X wins

    const status = document.getElementById('game-status').textContent;
    expect(status).toMatch(/hat gewonnen/);
    expect(c0.classList.contains('winning')).toBe(true);
    expect(c1.classList.contains('winning')).toBe(true);
    expect(c2.classList.contains('winning')).toBe(true);
  });
});
