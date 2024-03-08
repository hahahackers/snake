"use client";
import cx from "clsx";
import { useEffect, useState } from "react";
import _, { set } from "lodash";

let interval: NodeJS.Timeout | null = null;
let fruit: number[] = [5, 5];

function getHead(direction: string, x: number, y: number): number[] {
  switch (direction) {
    case "right":
      return [y, x + 1];
    case "left":
      return [y, x - 1];
    case "up":
      return [y - 1, x];
    case "down":
      return [y + 1, x];
  }
  return [0, 0];
}

function addFruit(snakeArg: number[][]) {
  let x: number, y: number;
  do {
    y = Math.floor(Math.random() * 10);
    x = Math.floor(Math.random() * 10);
    fruit = [y, x];
  } while (snakeArg.some(([sy, sx]) => sy === y && sx === x));
}

let direction = "right";
export default function Home() {
  const [snake, setSnake] = useState([
    [1, 1],
    [2, 1],
    [3, 1],
  ]);
  const [phase, setPhase] = useState("running");

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      console.log(e.key);

      switch (e.key) {
        case "ArrowUp":
          direction = direction === "down" ? "down" : "up";
          break;
        case "ArrowDown":
          direction = direction === "up" ? "up" : "down";
          break;
        case "ArrowLeft":
          direction = direction === "right" ? "right" : "left";
          break;
        case "ArrowRight":
          direction = direction === "left" ? "left" : "right";
          break;
      }
    });
    interval = setInterval(() => {
      setSnake((prev) => {
        const newHead = getHead(direction, prev[0][1], prev[0][0]);
        const [y, x] = newHead;
        if (
          y < 0 ||
          y >= 10 ||
          x < 0 ||
          x >= 10 ||
          prev.some(([sy, sx]) => sy === y && sx === x)
        ) {
          setPhase("lost");
          return prev;
        }
        const newSnake = [newHead, ...prev];

        if (!(x === fruit[1] && y === fruit[0])) {
          newSnake.pop();
        } else {
          addFruit(newSnake);
        }
        return newSnake;
      });
    }, 200);
    return () => {
      clearInterval(interval!);
    };
  }, []);

  const field = _.times(10, (y) =>
    _.times(10, (x) => {
      if (snake.some(([sy, sx]) => sy === y && sx === x)) {
        return "S";
      }
      if (fruit[0] === y && fruit[1] === x) {
        return "F";
      }
      return "_";
    })
  );

  function handlePlayAgain(): void {
    setSnake([
      [1, 1],
      [2, 1],
      [3, 1],
    ]);
    setPhase("running");
    direction = "right";
  }

  return (
    <main className="flex justify-center items-center flex-col flex-1">
      <div className="flex flex-col gap-2">
        {field.map((col, cind) => (
          <div className="flex gap-2" key={cind}>
            {col.map((row, rind) => (
              <div
                className={cx(
                  "w-6 h-6 flex justify-center items-center rounded",
                  {
                    "bg-green-200": row === "S",
                    "bg-red-200": row === "F",
                    "bg-slate-100": row === "_",
                  }
                )}
                key={rind}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {phase === "lost" && (
        <div className="mt-12 text-center">
          You Lose!
          <br />
          <button
            className="bg-slate-200 px-4 py-2 rounded"
            onClick={() => handlePlayAgain()}
          >
            Play Again
          </button>
        </div>
      )}
    </main>
  );
}
