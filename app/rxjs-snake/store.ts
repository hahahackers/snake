import _, { merge } from 'lodash';

import {
  fromEvent,
  map,
  filter,
  distinctUntilChanged,
  startWith,
  of,
  withLatestFrom,
  interval,
  scan,
  tap,
  combineLatest,
} from 'rxjs';

const direction$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
  map((e) => e.key),
  filter((key) =>
    ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)
  ),
  distinctUntilChanged(),
  map((key) => key.slice(5).toLowerCase()),
  startWith('right')
);

// direction$.subscribe(console.log);

const tick$ = interval(500);

// tick$.subscribe(console.log);
// const

const snake$ = tick$.pipe(
  withLatestFrom(direction$),
  scan(
    (snake, [_, direction]) => {
      const [x, y] = snake[0];
      switch (direction) {
        case 'up':
          return [[x, y - 1], ...snake.slice(0, -1)];
        case 'down':
          return [[x, y + 1], ...snake.slice(0, -1)];
        case 'left':
          return [[x - 1, y], ...snake.slice(0, -1)];
        case 'right':
          return [[x + 1, y], ...snake.slice(0, -1)];
      }
      return snake;
    },
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ]
  )
);

const fruit$ = snake$.pipe(
  scan(
    (fruit, snake) => {
      const [head] = snake;
      if (_.isEqual(head, fruit)) {
        return [_.random(0, 9), _.random(0, 9)];
      }
      return fruit;
    },
    [5, 5]
  ),
  tap((fruit) => console.log('fruit', fruit))
);

// snake$.subscribe(console.log);

export const board$ = combineLatest([snake$, fruit$]).pipe(
  scan((board, [snake, fruit]) => {
    const newBoard = _.times(10, () => _.times(10, () => 0));

    _.each(snake, ([x, y]) => {
      newBoard[y][x] = 1;
    });

    newBoard[fruit[1]][fruit[0]] = 2;

    return newBoard;
  }, [] as number[][])
);
