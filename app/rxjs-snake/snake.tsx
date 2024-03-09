'use client';

import _ from 'lodash';
import { board$ } from './store';
import { useObservable } from './utils';
import cx from 'clsx';

export default function Snake() {
  const board = useObservable(board$);

  return (
    <div className="m-12 flex flex-col gap-1">
      Snake
      {_.map(board, (row, y) => (
        <div key={y} className="flex gap-1">
          {_.map(row, (col, x) => (
            <div
              key={x}
              className={cx(
                'w-8 h-8 rounded text-xs flex items-center justify-center text-slate-300',
                {
                  'bg-red-300': col === 2,
                  'bg-green-300': col === 1,
                  'bg-slate-200': col === 0,
                }
              )}
            >
              {x}-{y}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
