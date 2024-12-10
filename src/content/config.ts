import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
    draft: z.boolean()
  }),
});

export const collections = { blog };