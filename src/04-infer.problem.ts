// CODE

import { z } from "zod";

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

/* Problem
  const logStarWarsPeopleResults = (data: unknown) => {
    data.results.map((person) => {
      console.log(person.name);
    });
  };
*/

// My solution
// Created a type with z.infer<>.

type TData = z.infer<typeof StarWarsPeopleResults>;

const logStarWarsPeopleResults = (data: TData) => {
  data.results.map((person) => {
    console.log(person.name);
  });
};
