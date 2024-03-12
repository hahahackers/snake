import cx from 'clsx';
import { Cell, Game } from '../types';
import { observer } from 'mobx-react-lite';

export const HtmlRenderer = observer(function HtmlRenderer({ game }: { game: Game }) {
  return (
    <main className="flex justify-center items-center flex-col h-screen">
      <p className="mb-2">Points: {game.points}</p>
      <div className="flex flex-col gap-1.5 border-2 border-slate-300 rounded-md p-1">
        {game.board.map((col, x) => (
          <div className="flex gap-1.5" key={x}>
            {col.map((row, y) => (
              <div
                className={cx('w-8 h-8 flex justify-center items-center rounded ', {
                  'bg-green-300': row === Cell.Snake,
                  'bg-green-300 eyes eyes-up': row === Cell.HeadUp,
                  'bg-green-300 eyes eyes-right': row === Cell.HeadRight,
                  'bg-green-300 eyes eyes-down': row === Cell.HeadDown,
                  'bg-green-300 eyes eyes-left': row === Cell.HeadLeft,

                  'bg-slate-50': row === Cell.Empty && (y - x) % 2 === 0,
                  'bg-slate-100': row === Cell.Empty && (y - x) % 2 !== 0,

                  'bg-red-500': row === Cell.Fruit,
                })}
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
            onClick={() => game.start()}
          >
            Play Again
          </button>
        </div>
      )}
    </main>
  );
});
