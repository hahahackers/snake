"use client";

import { useEffect } from "react";
import { store } from "./store";
import { observer } from "mobx-react-lite";
import cx from "clsx";

export const Game = observer(() => {
  useEffect(() => {
    if (store.phase === "idle") {
      store.setup();
      store.run();
    }
  }, []);

  return (
    <main className="flex justify-center items-center flex-col h-screen">
      <div className="flex flex-col gap-2">
        {store.field.map((col, cind) => (
          <div className="flex gap-2" key={cind}>
            {col.map((row, rind) => (
              <div
                className={cx(
                  "w-6 h-6 flex justify-center items-center rounded",
                  {
                    "bg-green-200": row === "S",
                    "bg-red-200": row === "F",
                    "bg-slate-100": row === "_"
                  }
                )}
                key={rind}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {store.phase === "lost" && (
        <div className="mt-12">
          You Lose!
          <button onClick={() => store.run()}>Play Again</button>
        </div>
      )}
    </main>
  );
});
