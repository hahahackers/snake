'use client';

import { Layer, Stage, Rect } from 'react-konva';
import { store as game } from '../(components)/store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const CanvasRenderer = observer(() => {
  useEffect(() => {
    if (game.phase === 'idle') {
      game.setup();
      game.run();
    }
  }, []);
  return (
    <Stage width={400} height={400}>
      <Layer>
        {game.field.map((col, y) =>
          col.map((row, x) => {
            console.log(x * 10, y * 10);

            return (
              <Rect
                key={`${x}-${y}`}
                x={x * 35}
                y={y * 35}
                width={30}
                height={30}
                fill={row === 'S' ? 'green' : row === 'F' ? 'red' : 'lightgray'}
              />
            );
          })
        )}
      </Layer>
    </Stage>
  );
});

export default CanvasRenderer;
