/**
 * Created by slhenty on 2023-10-11.
 */

// RiteWay description
//
// RiteWay is a simple, unobtrusive alternative to Mocha, Jasmine, and Jest.
// It's a single file with no dependencies, and it weighs in at just under 1KB
// (minified and gzipped). It's designed to work with Node.js and ES6+ in the
// browser. It's also designed to be easy to migrate to, if you're already
// using one of the aforementioned frameworks.
//
// RiteWay is a BDD-style testing framework. It provides a describe function
// for grouping tests, and an assert function for making assertions. It also
// provides a Try function for testing functions that may throw errors.
//
// RiteWay is designed to be used with Node.js's built-in assert module. This
// means that you can use any of the assert module's methods in your tests.
// RiteWay also provides a few additional methods that make it easier to write
// tests for asynchronous functions.

// tests for utils/fp.js using RiteWay
import {describe} from 'riteway';
import {compose, pipe, curry, curryN, memoize} from './fp.js';

describe('compose', async (assert) => {
  // array
  const reverse = (arr) => arr.reverse();
  const sort = (arr) => arr.sort();
  const add2 = x => x + 2;
  const times3 = x => x * 3;
  const sortThenReverse = compose(reverse, sort);
  const reverseThenSort = compose(sort, reverse);
  const add2ThenTimes3 = compose(times3, add2);
  const times3ThenAdd2 = compose(add2, times3);
  assert({
    given: 'an array of numbers',
    should: 'return the array sorted in descending order',
    actual: sortThenReverse([1, 2, 3]),
    expected: [3, 2, 1]
  });
  assert({
    given: 'an array of numbers',
    should: 'return the array sorted in ascending order',
    actual: reverseThenSort([1, 2, 3]),
    expected: [1, 2, 3]
  });
  assert({
    given: 'a number',
    should: 'return the result of adding 2 to the number and then multiplying the result by 3',
    actual: add2ThenTimes3(2),
    expected: 12
  });
  assert({
    given: 'a number',
    should: 'return the result of multiplying the number by 3 and then adding 2 to the result',
    actual: times3ThenAdd2(2),
    expected: 8
  });
});

describe('pipe', async (assert) => {
  //array
  const reverse = (arr) => arr.reverse();
  const sort = (arr) => arr.sort();
  const add2 = x => x + 2;
  const times3 = x => x * 3;
  const reverseThenSort = pipe(reverse, sort);
  const sortThenReverse = pipe(sort, reverse);
  const add2ThenTimes3 = pipe(add2, times3);
  const times3ThenAdd2 = pipe(times3, add2);
  assert({
    given: 'an array of numbers',
    should: 'return the array sorted in ascending order',
    actual: reverseThenSort([1, 2, 3]),
    expected: [1, 2, 3]
  });
  assert({
    given: 'an array of numbers',
    should: 'return the array sorted in descending order',
    actual: sortThenReverse([1, 2, 3]),
    expected: [3, 2, 1]
  });
  assert({
    given: 'a number',
    should: 'return the result of adding 2 to the number and then multiplying the result by 3',
    actual: add2ThenTimes3(2),
    expected: 12
  });
  assert({
    given: 'a number',
    should: 'return the result of multiplying the number by 3 and then adding 2 to the result',
    actual: times3ThenAdd2(2),
    expected: 8
  });
});

describe('curry', async (assert) => {
  // function with 2 arguments
  const add = (a, b) => a + b;
  const curriedAdd = curry(add);
  assert({
    given: 'two numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd(1)(2),
    expected: 3
  });
  assert({
    given: 'two numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd(1, 2),
    expected: 3
  });

  // function with 3 arguments

  const add3 = (a, b, c) => a + b + c;
  const curriedAdd3 = curry(add3);
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd3(1)(2)(3),
    expected: 6
  });
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd3(1, 2)(3),
    expected: 6
  });
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd3(1)(2, 3),
    expected: 6
  });
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd3(1, 2, 3),
    expected: 6
  });

  // function with ...args argument
  const addArgs = (...args) => args.reduce((acc, curr) => acc + curr, 0);
  const curriedAddArgs = curry(addArgs);
  assert({
    given: 'an individual argument',
    should: 'NOT return a function after the first invocation',
    actual: typeof curriedAddArgs(1),
    expected: 'number'
  });
  assert({
    given: 'multiple arguments',
    should: 'NOT return a function after the first invocation',
    actual: typeof curriedAddArgs(1, 2),
    expected: 'number'
  });
} );

describe('curryN', async (assert) => {
// function with 2 arguments
  const add = (a, b) => a + b;
  const curriedAdd = curryN(2, add);
  assert({
    given: 'two numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd(1)(2),
    expected: 3
  });
  assert({
    given: 'two numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd(1, 2),
    expected: 3
  });

  // function with 3 arguments
  const add3 = (a, b, c) => a + b + c;
  const curriedAdd3 = curryN(3, add3);
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd3(1)(2)(3),
    expected: 6
  });
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd3(1, 2)(3),
    expected: 6
  });
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd3(1)(2, 3),
    expected: 6
  });
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAdd3(1, 2, 3),
    expected: 6
  });

  // function with ...args argument
  const addArgs = (...args) => args.reduce((acc, curr) => acc + curr, 0);
  const curriedAddArgs = curryN(3, addArgs);
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAddArgs(1)(2)(3),
    expected: 6
  });
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAddArgs(1, 2)(3),
    expected: 6
  });
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAddArgs(1)(2, 3),
    expected: 6
  });
  assert({
    given: 'three numbers',
    should: 'return the sum of the numbers',
    actual: curriedAddArgs(1, 2, 3),
    expected: 6
  });
  assert({
    given: 'four numbers',
    should: 'return the sum of the first three numbers',
    actual: curriedAddArgs(1, 2, 3, 4),
    expected: 6
  });
} );

describe('memoize', async (assert) => {
  // one set of arguments requested multiple times, invoke function once
  const withCounter = (fn) => {
    let counter = 0;
    return {
      count: () => counter,
      fn: (...args) => {
        counter++;
        return fn(...args);
      }
    };
  }
  const add = (a, b) => a + b;
  const counter = withCounter(add);
  const memoizedAdd = memoize(counter.fn);
  assert({
    given: 'a set of arguments',
    should: 'return a valid result',
    actual: memoizedAdd(1, 2),
    expected: 3
  });
  assert({
    given: 'the same arguments',
    should: 'return the same result',
    actual: memoizedAdd(1, 2),
    expected: 3
  });
  assert({
    given: 'multiple invocations with the same arguments',
    should: 'invoke the function once',
    actual: counter.count(),
    expected: 1
  });

  // multiple sets of arguments requested multiple times, invoke function once for each set of arguments
  assert({
    given: 'a new set of arguments',
    should: 'return a new valid result',
    actual: memoizedAdd(2, 3),
    expected: 5
  });
  assert({
    given: 'the same arguments',
    should: 'return the same result',
    actual: memoizedAdd(2, 3),
    expected: 5
  });
  assert({
    given: 'multiple invocations with multiple sets of arguments',
    should: 'invoke the function once per set of arguments',
    actual: counter.count(),
    expected: 2
  });
} );
