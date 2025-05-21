import { defineCollection, z,  } from 'astro:content';
import { file } from 'astro/loaders';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
    draft: z.boolean(),
  }),
});

const projects = defineCollection({
  schema:z.object({
    name: z.string(),
  }),
});

export const collections = { blog, projects };
