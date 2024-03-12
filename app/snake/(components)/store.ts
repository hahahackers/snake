import { makeAutoObservable } from 'mobx';
import _ from 'lodash';

function getHead(direction: string, x: number, y: number): number[] {
  switch (direction) {
    case 'right':
      return [y, x + 1];
    case 'left':
      return [y, x - 1];
    case 'up':
      return [y - 1, x];
    case 'down':
      return [y + 1, x];
  }
  return [0, 0];
}

class SnakeStore {
  field = _.times(10, () => _.times(10, () => '_'));
  snake = [
    [1, 1],
    [2, 1],
    [3, 1],
  ];
  fruit = [5, 5];
  direction = 'right';
  lastDirection = this.direction;
  isRunning = false;
  interval: ReturnType<typeof setInterval> | null = null;
  phase = 'idle';

  // Initialization
  setup() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.direction = this.lastDirection === 'down' ? 'down' : 'up';
          break;
        case 'ArrowDown':
          this.direction = this.lastDirection === 'up' ? 'up' : 'down';
          break;
        case 'ArrowLeft':
          this.direction = this.lastDirection === 'right' ? 'right' : 'left';
          break;
        case 'ArrowRight':
          this.direction = this.lastDirection === 'left' ? 'left' : 'right';
          break;
      }
    });
  }

  addFruit() {
    do {
      const y = Math.floor(Math.random() * 10);
      const x = Math.floor(Math.random() * 10);
      this.fruit = [y, x];
    } while (
      this.snake.some(
        ([sy, sx]) => sy === this.fruit[0] && sx === this.fruit[1]
      )
    );
  }

  // Processing input
  input() {}

  private isHeadOutOfBounds([x, y]: [number, number]) {
    return !_.inRange(x, 0, 10) || !_.inRange(y, 0, 10);
  }

  private isCollidingWithItself([x, y]: [number, number]) {
    return this.snake.some(([sx, sy]) => sx === x && sy === y);
  }

  // Updating the game state
  update() {
    const [_y, _x] = this.snake.at(0)!;
    const [y, x] = getHead(this.direction, _x, _y);

    if (this.isHeadOutOfBounds([y, x]) || this.isCollidingWithItself([y, x])) {
      this.interval && clearInterval(this.interval);
      this.phase = 'lost';

      return;
    }

    this.snake.unshift([y, x]);

    if (!(x === this.fruit[1] && y === this.fruit[0])) {
      this.snake.pop();
    } else {
      this.addFruit();
    }

    this.field = _.times(10, (y) =>
      _.times(10, (x) => {
        if (this.snake.some(([sy, sx]) => sy === y && sx === x)) {
          return 'S';
        }
        if (_.isEqual(_.head(this.snake), this.fruit)) {
          return 'E';
        }
        if (_.isEqual(this.fruit, [y, x])) {
          return 'F';
        }
        return '_';
      })
    );

    this.lastDirection = this.direction;
  }

  // Rendering the game, we probably won't use this, as we will use React to render the game
  render() {}

  run() {
    this.phase = 'running';
    this.update();
    this.interval = setInterval(() => {
      this.update();
    }, 200);
    this.snake = [
      [1, 1],
      [2, 1],
      [3, 1],
    ];

    this.fruit = [5, 5];
    this.direction = 'right';
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new SnakeStore();
