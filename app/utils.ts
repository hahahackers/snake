declare module _ {
  interface LoDashStatic {
    table: (size: number, cb: (x: number, y: number) => any) => any[][];
  }
}

_.mixin({
  table: (size, cb) => {
    return _.times(size, (y) => _.times(size, (x) => cb(x, y)));
  },
});
