'use client';

import Konva from 'konva';
import { Layer, Stage, Rect } from 'react-konva';

export default function CanvasRenderer() {
  return (
    <Stage width={200} height={200}>
      <Layer>
        <Rect x={20} y={20} width={100} height={100} fill="red" draggable />
      </Layer>
    </Stage>
  );
}
