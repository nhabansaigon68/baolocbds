// Import utilities from `astro:content`
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

// --------------------------------------------------
// POSTS
// --------------------------------------------------

const postsCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/posts",
  }),

  schema: z.object({
    title: z.string(),
   
    pubDate: z.date(),
    description: z.string(),

    author: z.string(),

    category: z.string(),

    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),

    readingTime: z.number().optional(),
  }),
});

// --------------------------------------------------
// PROJECTS
// --------------------------------------------------

const projectsCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),

    schema: z.object({
    title: z.string(),
    projectName: z.string().optional(),
    description: z.string(),

    navTitle: z.string().optional(),
    order: z.number().optional(),

    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),

    cover: z.string().optional(),

    location: z.string().optional(),
    status: z.string().optional(),

    category: z.string().default("Dự án"),
  }),
});

// --------------------------------------------------
// COLLECTIONS
// --------------------------------------------------

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
};