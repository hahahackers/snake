'use client';

import { useEffect } from 'react';
import { game } from './store';
import { observer } from 'mobx-react-lite';
import { HtmlRenderer } from '@/app/_components/renderers/HtmlRenderer';

const Game = observer(() => {
  useEffect(() => {
    if (game.phase === 'idle') {
      game.setup();
      game.start();
    }
  }, []);

  return <HtmlRenderer game={game} />;
});

export default Game;
