'use client';

import _ from 'lodash';
import { board$ } from './store';
import { useObservable } from './utils';
import cx from 'clsx';

export default function Snake() {
  const board = useObservable(board$);

  console.log(board);

  return (
    <div>
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div key={j} className={cx('cell', { snake: cell === 1 })} />
          ))}
        </div>
      ))}
    </div>
  );
}
