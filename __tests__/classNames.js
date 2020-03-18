const classNames = require('../classNames.js');

test('merges all un-conditional classNames', () => {
  expect(classNames('hello', 'world', 'bye', 'world')).toBe('hello world bye world');
});

test('ignores any falsey value in unconditional classNames', () => {
  expect(classNames(undefined, 'hello', null, false, 'world', 0, '')).toBe('hello world');
  expect(classNames(false, undefined, 0, null)).toBe('');
});

test('handles conditions when case is true', () => {
  expect(classNames('hello', [true, 'world'], [false, 'none'])).toBe('hello world');
  expect(classNames('hello', [true, 'world'], [false, 'none'], 'sup')).toBe('hello world sup');
});

test('handles fallback when condition is false', () => {
  expect(classNames('hello', [false, 'world', 'people'])).toBe('hello people');
  expect(classNames('hello', [false, 'world', 'people'], [false, 'ok', 'again'])).toBe('hello people again');
});

test('does not include any classNames if the case is true and fallback was provided', () => {
  expect(classNames('hello', [false, 'world', 'people'], [true, '', 'again'])).toBe('hello people');
});
