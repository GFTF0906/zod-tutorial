// CODE

import { expect, it } from "vitest";
import { z } from "zod";

/* Problem
  const StarWarsPerson = z.object({
    name: z.string(),
  });
*/

// I had a hard time trying to solve this problem, but after some research on the ".transform method" this was the solution i come up with

const StarWarsPerson = z
  .object({
    name: z.string(),
  })
  .transform((starWarsPerson) => ({
    ...starWarsPerson,
    nameAsArray: starWarsPerson.name.split(" "),
  }));

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

export const fetchStarWarsPeople = async () => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people.json",
  ).then((res) => res.json());

  const parsedData = StarWarsPeopleResults.parse(data);
  return parsedData.results;
};

// TESTS

it("Should resolve the name and nameAsArray", async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: "Luke Skywalker",
    nameAsArray: ["Luke", "Skywalker"],
  });
});
