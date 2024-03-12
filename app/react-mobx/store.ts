import { makeAutoObservable } from 'mobx';
import _ from 'lodash';
import { Phase, Direction, Cell, Game } from '@/app/_components/types';
import { array2D } from '@/app/_components/utils';

const SIZE = 10;

class SnakeStore implements Game {
  board = array2D(SIZE, () => Cell.Empty);
  snake = [
    [1, 1],
    [2, 1],
    [3, 1],
  ];
  fruit = [5, 5];
  direction: Direction = Direction.Right;
  lastDirection = this.direction;
  interval: ReturnType<typeof setInterval> | null = null;
  phase: Phase = 'idle';

  get points() {
    return this.snake.length - 3;
  }

  // Initialization
  setup() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.direction = this.lastDirection === Direction.Down ? Direction.Down : Direction.Up;
          break;
        case 'ArrowDown':
          this.direction = this.lastDirection === Direction.Up ? Direction.Up : Direction.Down;
          break;
        case 'ArrowLeft':
          this.direction = this.lastDirection === Direction.Right ? Direction.Right : Direction.Left;
          break;
        case 'ArrowRight':
          this.direction = this.lastDirection === Direction.Left ? Direction.Left : Direction.Right;
          break;
      }
    });
  }

  addFruit() {
    do {
      const y = Math.floor(Math.random() * SIZE);
      const x = Math.floor(Math.random() * SIZE);
      this.fruit = [y, x];
    } while (this.snake.some(([sy, sx]) => sy === this.fruit[0] && sx === this.fruit[1]));
  }

  private isHeadOutOfBounds([x, y]: [number, number]) {
    return !_.inRange(x, 0, SIZE) || !_.inRange(y, 0, SIZE);
  }

  private isCollidingWithItself([x, y]: [number, number]) {
    return this.snake.some(([sx, sy]) => sx === x && sy === y);
  }

  private getHead(direction: Direction, x: number, y: number): number[] {
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

  // Updating the game state
  update() {
    const [_y, _x] = this.snake.at(0)!;
    const [y, x] = this.getHead(this.direction, _x, _y);

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

    this.board = array2D(SIZE, (x, y) => {
      if (_.isEqual(_.head(this.snake), [y, x])) {
        switch (this.direction) {
          case 'up':
            return Cell.HeadUp;
          case 'down':
            return Cell.HeadDown;
          case 'left':
            return Cell.HeadLeft;
          case 'right':
            return Cell.HeadRight;
        }
      }
      if (this.snake.some(([sy, sx]) => sy === y && sx === x)) {
        return Cell.Snake;
      }

      if (_.isEqual(this.fruit, [y, x])) {
        return Cell.Fruit;
      }

      return '_';
    });

    this.lastDirection = this.direction;
  }

  // Rendering the game, we don't use this,
  // as we will use React to render the game
  render() {}

  start() {
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
    this.direction = Direction.Right;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const game = new SnakeStore();
