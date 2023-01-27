import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

/**
 * 🕵️‍♂️ Refactor this code below to reduce the duplication,
 * while also making sure the cases don't go red!

  const User = z.object({
    id: z.string().uuid(),
    name: z.string(),
  });

  const Post = z.object({
    id: z.string().uuid(),
    title: z.string(),
    body: z.string(),
  });

  const Comment = z.object({
    id: z.string().uuid(),
    text: z.string(),
  });

*/

// My solution
// Created a separated object with only id, and extended it with respective objects

const ObjID = z.object({
  id: z.string().uuid()
})

const User = ObjID.extend({
  name: z.string(),
});

const Post =  ObjID.extend({
  title: z.string(),
  body: z.string(),
});

const Comment =  ObjID.extend({
  text: z.string(),
});

type cases = [
  Expect<Equal<z.infer<typeof Comment>, { id: string; text: string }>>,
  Expect<
    Equal<z.infer<typeof Post>, { id: string; title: string; body: string }>
  >,
  Expect<Equal<z.infer<typeof User>, { id: string; name: string }>>,
];
