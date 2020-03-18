function pipe(initialValue) {
  const fns = [initialValue];
  return function(...functionsOrGuard) {
    let value = initialValue;
    for (let i = 0; i < functionsOrGuard.length; i++) {
      const fnOrGuard = functionsOrGuard[i];
      if (typeof fnOrGuard === 'function') {
        value = fnOrGuard(value);
      } else if (Array.isArray(fnOrGuard)) {
        const [condition, fn, fallbackFn] = fnOrGuard;
        if (condition && typeof fn === 'function') {
          value = fn(value);
        } else if (!condition && typeof fallbackFn == 'function') {
          value = fallbackFn(value);
        }
      } else {
        throw new TypeError('expected function or guard, guards signature -> [condition, (accumulator) => value]');
      }
    }
    return value;
  };
}

const playerData = pipe({ x: 0, y: 0 })(
  ({ x, y }) => ({ x: x + 1, y: y + 2 }),
  [true, ({ x, y }) => ({ x: x - 50, y: y + 100 })],
  [false, ({ x, y }) => ({ x, y }), ({ x, y }) => ({ x: x + 150, y: y - 20 })],
  ({ x, y }) => ({ x, y, score: x + y })
);

const addOne = val => val + 1;
const half = val => val / 2;
const sqr = val => val * val;

const myCalc = pipe(0)(addOne, half, sqr);

console.log(playerData, myCalc);
