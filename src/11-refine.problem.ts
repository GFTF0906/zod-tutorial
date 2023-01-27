// CODE

import { expect, it } from "vitest";
import { z } from "zod";

/* Problem 
  const Form = z.object({
    password: z.string(),
    confirmPassword: z.string(),
  });
*/

// My solution
// Used the .refine method to make sure that passwords are the same, and throw error with they're not the same.

const Form = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine((props) => props.password === props.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords don\'t match.'
})

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);
  return parsedData;
};

// TESTS
it("Should error if the passwords are not the same", () => {
  expect(() =>
    validateFormInput({
      password: "password",
      confirmPassword: "password1",
    }),
  ).toThrowError("Passwords don't match");
});
