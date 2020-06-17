import cls from '../classNames';

test('merges all un-conditional classNames', () => {
  expect(cls('hello', 'world', 'bye', 'world')).toBe('hello world bye world');
});

test('ignores any falsey value in unconditional classNames', () => {
  expect(cls(undefined, 'hello', null, undefined, 'world', null, '')).toBe('hello world');
  expect(cls(null, undefined, undefined, null)).toBe('');
});

test('handles conditions when case is true', () => {
  expect(cls('hello', [true, 'world'], [false, 'none'])).toBe('hello world');
  expect(cls('hello', [true, 'world'], [false, 'none'], 'sup')).toBe('hello world sup');
});

test('handles fallback when condition is false', () => {
  expect(cls('hello', [false, 'world', 'people'])).toBe('hello people');
  expect(cls('hello', [false, 'world', 'people'], [false, 'ok', 'again'])).toBe('hello people again');
});

test('does not include any classNames if the case is true and fallback was provided', () => {
  expect(cls('hello', [false, 'world', 'people'], [true, '', 'again'])).toBe('hello people');
});
