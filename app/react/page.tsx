'use client';

import { useEffect, useState } from 'react';
import _ from 'lodash';
import { HtmlRenderer } from '@/app/_components/renderers/HtmlRenderer';
import { Direction, Phase } from '@/app/_components/types';

let interval: ReturnType<typeof setInterval>;

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

function addFruit(snakeArg: number[][]) {
  let x: number, y: number;
  do {
    y = Math.floor(Math.random() * 10);
    x = Math.floor(Math.random() * 10);
    return [y, x];
  } while (snakeArg.some(([sy, sx]) => sy === y && sx === x));
}

let direction = 'right';
export default function Home() {
  const [data, setData] = useState({
    snake: [
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    fruit: [5, 5],
  });
  const [phase, setPhase] = useState<Phase>('running');

  function run() {
    console.log('tick');
    setData(({ snake, fruit }) => {
      console.log('set snake');
      const newHead = getHead(direction, snake[0][1], snake[0][0]);
      const [y, x] = newHead;
      if (y < 0 || y >= 10 || x < 0 || x >= 10 || snake.some(([sy, sx]) => sy === y && sx === x)) {
        setPhase('lost');
        clearInterval(interval);
        return { snake, fruit };
      }
      const newSnake = [newHead, ...snake];

      if (!(x === fruit[1] && y === fruit[0])) {
        console.log('1', snake, newSnake, fruit);
        newSnake.pop();
      } else {
        console.log('2', snake, newSnake, fruit);

        return {
          snake: newSnake,
          fruit: addFruit(newSnake),
        };
      }

      return {
        snake: newSnake,
        fruit,
      };
    });
  }

  useEffect(() => {
    console.log(interval);
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          direction = direction === 'down' ? 'down' : 'up';
          break;
        case 'ArrowDown':
          direction = direction === 'up' ? 'up' : 'down';
          break;
        case 'ArrowLeft':
          direction = direction === 'right' ? 'right' : 'left';
          break;
        case 'ArrowRight':
          direction = direction === 'left' ? 'left' : 'right';
          break;
      }
    });

    console.log('set interval');
    interval = setInterval(run, 300);
    return () => {
      console.log('clear interval');
      clearInterval(interval);
    };
  }, []);

  const field = _.times(10, (y) =>
    _.times(10, (x) => {
      if (data.snake.some(([sy, sx]) => sy === y && sx === x)) {
        return 'S';
      }
      if (data.fruit[0] === y && data.fruit[1] === x) {
        return 'F';
      }
      return '_';
    }),
  );

  function handlePlayAgain(): void {
    setData({
      snake: [
        [1, 1],
        [2, 1],
        [3, 1],
      ],
      fruit: [5, 5],
    });
    setPhase('running');
    direction = 'right';
    interval = setInterval(run, 300);
  }

  return (
    <HtmlRenderer
      game={{
        board: field,
        points: data.snake.length - 3,
        start: phase === 'lost' ? handlePlayAgain : run,
        phase: phase,
      }}
    />
  );

  // return (
  //   <main className="flex justify-center items-center flex-col flex-1">
  //     <div className="flex flex-col gap-2">
  //       {field.map((col, cind) => (
  //         <div className="flex gap-2" key={cind}>
  //           {col.map((row, rind) => (
  //             <div
  //               className={cx(
  //                 'w-6 h-6 flex justify-center items-center rounded',
  //                 {
  //                   'bg-green-200': row === 'S',
  //                   'bg-red-200': row === 'F',
  //                   'bg-slate-100': row === '_',
  //                 }
  //               )}
  //               key={rind}
  //             ></div>
  //           ))}
  //         </div>
  //       ))}
  //     </div>
  //     {phase === 'lost' && (
  //       <div className="mt-12 text-center">
  //         You Lose!
  //         <br />
  //         <button
  //           className="bg-slate-200 px-4 py-2 rounded"
  //           onClick={() => handlePlayAgain()}
  //         >
  //           Play Again
  //         </button>
  //       </div>
  //     )}
  //   </main>
  // );
}
