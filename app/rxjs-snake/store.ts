import _ from 'lodash';

import {
  of,
  from,
  pipe,
  fromEvent,
  timer,
  animationFrames,
  delay,
  zip,
  throttleTime,
  map,
  distinctUntilChanged,
  startWith,
  distinctUntilKeyChanged,
  combineLatest,
} from 'rxjs';

const direction$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
  map((e) => e.key),
  startWith('right'),
  map((key) => key.replace('Arrow', '').toLowerCase()),
  distinctUntilChanged()
);

direction$.subscribe(console.log);

export const board$ = of([]);
