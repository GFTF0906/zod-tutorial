// CODE

import { expect, it } from "vitest";
import { z } from "zod";

/* Problem
  const Form = z.object({
    repoName: z.string(),
    privacyLevel: z.string(),
  });
*/

// My solution
// Used a union of literal types.

const Form = z.object({
  repoName: z.string(),
  privacyLevel: z.union([z.literal('public'), z.literal('private')]),
});

export const validateFormInput = (values: unknown): z.infer<typeof Form> => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should fail if an invalid privacyLevel passed", async () => {
  expect(() =>
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "something-not-allowed",
    }),
  ).toThrowError();
});

it("Should permit valid privacy levels", async () => {
  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "private",
    }).privacyLevel,
  ).toEqual("private");

  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "public",
    }).privacyLevel,
  ).toEqual("public");
});
