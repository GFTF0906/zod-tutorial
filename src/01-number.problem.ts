// CODE
import { expect, it } from "vitest";
import { z } from 'zod';

/* Problem
  export const toString = (num: unknown) => {
    return String(num);
  };
*/

// My solution
// Used the parse() method, to type 'num' as number.
 
export const toString = (num: unknown) => {
  return String(z.number().parse(num));
};

// TESTS
it("Should throw a runtime error when called with not a number", () => {
  expect(() => toString("123")).toThrowError(
    "Expected number, received string",
  );
});

it("Should return a string when called with a number", () => {
  expect(toString(1)).toBeTypeOf("string");
});
