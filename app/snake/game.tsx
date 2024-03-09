'use client';

import { useEffect } from 'react';
import _ from 'lodash';
import { store as game } from './store';
import { observer } from 'mobx-react-lite';
import cx from 'clsx';

const Game = observer(() => {
  useEffect(() => {
    if (game.phase === 'idle') {
      game.setup();
      game.run();
    }
  }, []);

  return (
    <main className="flex justify-center items-center flex-col h-screen">
      <p className="mb-2">Snake length: {game.snake.length}</p>
      <div className="flex flex-col gap-1.5 border-2 border-slate-300 rounded-md p-1">
        {game.field.map((col, x) => (
          <div className="flex gap-1.5" key={x}>
            {col.map((row, y) => (
              <div
                className={cx(
                  'w-8 h-8 flex justify-center items-center rounded ',
                  {
                    'bg-green-300': row === 'S',
                    'bg-red-300': row === 'F',
                    'bg-slate-50': row === '_' && (y - x) % 2 === 0,
                    'bg-slate-100': row === '_' && (y - x) % 2 !== 0,
                    'bg-blue-200': row === 'E',
                    'eyes eyes-right':
                      _.isEqual(_.head(game.snake), [x, y]) &&
                      game.lastDirection === 'right',
                    'eyes eyes-left':
                      _.isEqual(_.head(game.snake), [x, y]) &&
                      game.lastDirection === 'left',
                    'eyes eyes-up':
                      _.isEqual(_.head(game.snake), [x, y]) &&
                      game.lastDirection === 'up',
                    'eyes eyes-down':
                      _.isEqual(_.head(game.snake), [x, y]) &&
                      game.lastDirection === 'down',
                    'bg-red-500': _.isEqual(game.fruit, [x, y]),
                  }
                )}
                key={y}
              />
            ))}
          </div>
        ))}
      </div>
      {game.phase === 'lost' && (
        <div className="mt-12 flex gap-2 items-center">
          <span>You Lose!</span>
          <button
            className="px-2 py-1 bg-slate-200 rounded hover:bg-slate-300 transition-colors"
            onClick={() => game.run()}
          >
            Play Again
          </button>
        </div>
      )}
    </main>
  );
});

export default Game;
