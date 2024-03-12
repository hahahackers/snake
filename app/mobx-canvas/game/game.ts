export class Game {
  secondsPassed = 0;
  oldTimeStamp = 0;
  fps;

  setup() {}

  update(timestamp: number) {
    this.secondsPassed = (timestamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timestamp;
    this.fps = Math.round(1 / this.secondsPassed);

    // console.log(performance.now());

    requestAnimationFrame(this.update);
  }

  run() {
    this.setup();

    requestAnimationFrame(this.update);
  }

  constructor() {
    this.update = this.update.bind(this);
  }
}

export const game = new Game();
