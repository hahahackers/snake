import _ from 'lodash';
import { combine, createDomain } from 'effector';

const game = createDomain('game');

const tick = game.effect(wait);

const $direction = game.store('right');

const $snake = game
  .store([
    [1, 1],
    [1, 2],
    [1, 3],
  ])
  .on(tick.done, (snake) => {
    const [y, x] = snake[0];
    return [[y, x + 1], ...snake.slice(0, -1)];
  });

export const $store = combine($snake, (snake) => {
  return _.times(10, (y) => {
    return _.times(10, (x) => {
      if (snake.some(([sy, sx]) => sy === y && sx === x)) {
        return 'S';
      }
      return '_';
    });
  });
});

function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 200);
  });
}
