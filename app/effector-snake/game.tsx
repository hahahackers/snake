'use client';

import { useUnit } from 'effector-react';
import { $store } from './store';

export default function Game() {
  const store = useUnit($store);

  return (
    <main className="m-12">
      <div className="flex flex-col gap-2">
        {store.map((row, y) => (
          <div key={y} className="flex gap-2">
            {row.map((cell, x) => (
              <div
                key={x}
                className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center"
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
