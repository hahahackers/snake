declare module _ {
  interface LoDashStatic {
    table: (size: number, cb: (x: number, y: number) => any) => any[][];
  }
}
