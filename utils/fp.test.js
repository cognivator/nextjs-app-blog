/**
 * Created by slhenty on 2023-10-11.
 */

// tests for utils/fp.js
import { compose, pipe, curry, curryN, memoize } from './fp';
import {describe, expect, test} from '@jest/globals';

describe('compose', () => {
  test('should compose functions', () => {
    const reverse = (arr) => arr.reverse();
    const sort = (arr) => arr.sort();
    const add2 = x => x + 2;
    const times3 = x => x * 3;
    const sortThenReverse = compose(reverse, sort);
    const reverseThenSort = compose(sort, reverse);
    const add2ThenTimes3 = compose(times3, add2);
    const times3ThenAdd2 = compose(add2, times3);
    expect(sortThenReverse([1, 2, 3])).toEqual([3, 2, 1]);
    expect(reverseThenSort([1, 2, 3])).toEqual([1, 2, 3]);
    expect(add2ThenTimes3(2)).toEqual(12);
    expect(times3ThenAdd2(2)).toEqual(8);
  });
});

describe('pipe', () => {
  test('should pipe functions', () => {
    const reverse = (arr) => arr.reverse();
    const sort = (arr) => arr.sort();
    const add2 = x => x + 2;
    const times3 = x => x * 3;
    const reverseThenSort = pipe(reverse, sort);
    const sortThenReverse = pipe(sort, reverse);
    const add2ThenTimes3 = pipe(add2, times3);
    const times3ThenAdd2 = pipe(times3, add2);
    expect(reverseThenSort([1, 2, 3])).toEqual([1, 2, 3]);
    expect(sortThenReverse([1, 2, 3])).toEqual([3, 2, 1]);
    expect(add2ThenTimes3(2)).toEqual(12);
    expect(times3ThenAdd2(2)).toEqual(8);
  });
});

describe('curry', () => {
  test('should curry functions', () => {
    const add = (a, b) => a + b;
    const curriedAdd = curry(add);
    expect(curriedAdd(1)(2)).toEqual(3);
    expect(curriedAdd(1, 2)).toEqual(3);
  });

  test('should curry functions with more than 2 arguments', () => {
    const add = (a, b, c) => a + b + c;
    const curriedAdd = curry(add);
    expect(curriedAdd(1)(2)(3)).toEqual(6);
    expect(curriedAdd(1, 2)(3)).toEqual(6);
    expect(curriedAdd(1)(2, 3)).toEqual(6);
    expect(curriedAdd(1, 2, 3)).toEqual(6);
  } );

  test('should fail to curry functions with ...args argument', () => {
    const add = (...args) => args.reduce((acc, curr) => acc + curr, 0);
    const curriedAdd = curry(add);
    expect(curriedAdd(1)).not.toBeFunction;
    expect(curriedAdd(1, 2)).not.toBeFunction;
    expect(curriedAdd(1, 2, 3)).not.toBeFunction;
  } );
} );

describe('curryN', () => {
  test('should curry functions', () => {
    const add = (a, b) => a + b;
    const curriedAdd = curryN(2, add);
    expect(curriedAdd(1)(2)).toEqual(3);
    expect(curriedAdd(1, 2)).toEqual(3);
  });

  test('should curry functions with more than 2 arguments', () => {
    const add = (a, b, c) => a + b + c;
    const curriedAdd = curryN(3, add);
    expect(curriedAdd(1)(2)(3)).toEqual(6);
    expect(curriedAdd(1, 2)(3)).toEqual(6);
    expect(curriedAdd(1)(2, 3)).toEqual(6);
    expect(curriedAdd(1, 2, 3)).toEqual(6);
  });

  test('should curry functions with ...args argument', () => {
    const add = (...args) => args.reduce((acc, curr) => acc + curr, 0);
    const curriedAdd = curryN(3, add);
    expect(curriedAdd(1)(2)(3)).toEqual(6);
    expect(curriedAdd(1, 2)(3)).toEqual(6);
    expect(curriedAdd(1)(2, 3)).toEqual(6);
    expect(curriedAdd(1, 2, 3)).toEqual(6);
    expect(curriedAdd(1, 2, 3, 4)).toEqual(6);
  } );
} );

describe('memoize', () => {
  test('should memoize function results', () => {
    const add = jest.fn((a, b) => a + b);
    const memoizedAdd = memoize(add);
    expect(memoizedAdd(1, 2)).toEqual(3);
    expect(memoizedAdd(1, 2)).toEqual(3);
    expect(memoizedAdd(1, 2)).toEqual(3);
    expect(add).toHaveBeenCalledTimes(1);
  });

  test('should memoize function results with unique arguments', () => {
    const add = jest.fn((a, b) => a + b);
    const memoizedAdd = memoize(add);
    // initial calls
    expect(memoizedAdd(1, 2)).toEqual(3);
    expect(memoizedAdd(1, 3)).toEqual(4);
    expect(memoizedAdd(1, 4)).toEqual(5);
    expect(add).toHaveBeenCalledTimes(3);
    add.mockClear();
    // memoized results
    expect(memoizedAdd(1, 2)).toEqual(3);
    expect(memoizedAdd(1, 3)).toEqual(4);
    expect(memoizedAdd(1, 4)).toEqual(5);
    expect(add).toHaveBeenCalledTimes(0);
  } );
} );
