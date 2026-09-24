import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().min(20).max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Optional taxonomy. Tag pages are deliberately NOT built yet.
    tags: z.array(z.string()).default([]),
    // Set true to keep a post out of the index, the feed and the sitemap.
    draft: z.boolean().default(false),
    // Copies of this post elsewhere. The site is always canonical; these
    // are syndicated duplicates, added after the fact. Empty by default so
    // a post is valid before it has been cross-posted.
    syndication: z
      .array(
        z.object({
          name: z.string(),        // e.g. "Substack"
          url: z.string().url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { blog };
