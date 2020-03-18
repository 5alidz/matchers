const pipe = require('../pipe.js');

test('pipes function without condtions', () => {
  expect(
    pipe(100)(
      acc => acc / 2,
      acc => acc / 5
    )
  ).toBe(10);
});

test('handle conditions', () => {
  expect(pipe(100)([true, acc => acc / 2], [false, acc => acc / 3, acc => acc / 5])).toBe(10);
  expect(pipe(1)([true, acc => acc + 1], [true, acc => acc + 5], [false, acc => acc * acc, acc => acc - 10])).toBe(-3);
});

test('throws if signature invalid', () => {
  const throws = () => pipe(0)('', null, undefined, [true, undefined], [false, null, null]);
  expect(throws).toThrow(TypeError);

  const throws2 = () => pipe(0)(null);
  expect(throws).toThrow(TypeError);
});

test('ignores invalid operations', () => {
  expect(pipe(0)([true, null])).toBe(0);
  expect(pipe(100)([true, 'sdf', 'alkdfj'], [false, null, null])).toBe(100);
});
