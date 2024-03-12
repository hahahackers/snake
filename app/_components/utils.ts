import _ from 'lodash';

export const array2D = (count: number, cb: (x: number, y: number) => any) =>
  _.times(count, (y) => _.times(count, (x) => cb(x, y)));
