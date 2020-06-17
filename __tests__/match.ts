import match from '../match';

test('throws error if no default case provided', () => {
  const throwing = () => {
    // @ts-ignore
    return match(true)([true, () => 'hello'], [false, () => 'bye']);
  };
  expect(throwing).toThrow(Error);
});

test('matches numbers', () => {
  const nums = [0, 1, 2, NaN];

  const result = match(nums[1])(
    [0, () => 'zero'],
    [1, () => 'one'],
    [2, () => 'two'],
    [NaN, () => 'not a number'],
    ['_', () => 'no numbers found']
  );
  expect(result).toBe('one');
});

test('matches strings', () => {
  const status = ['IDLE', 'LOADING', 'ERROR', 'SUCCESS'];

  const result = match(status[0])(
    ['LOADING', () => 'loading'],
    ['ERROR', () => 'error'],
    ['IDLE', () => 'idle'],
    ['SUCCESS', () => 'success'],
    ['_', () => 'unKnown status']
  );

  expect(result).toBe('idle');
});

test('matches booleans', () => {
  const status = [true, false];

  const result = match(status[0])([true, () => 'true'], [false, () => 'false'], ['_', () => 'not a boolean']);

  expect(result).toBe('true');
});
