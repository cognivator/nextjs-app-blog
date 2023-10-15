/**
 * Created by slhenty on 2023-10-11.
 */

export function compose(...fns) {
  return ((x) => fns.reduceRight((acc, fn) => fn(acc), x));
}

export function pipe(...fns) {
  return ((x) => fns.reduce((acc, fn) => fn(acc), x));
}

export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...args2) => curried(...args, ...args2);
  };
}

export function curryN(n, fn) {
  return function curried(...args) {
    if (args.length >= n) {
      return fn(...args.slice(0, n));
    }
    return (...args2) => curried(...args, ...args2);
  };
}

export function memoize(fn) {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}
