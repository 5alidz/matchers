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

module.exports = pipe;
