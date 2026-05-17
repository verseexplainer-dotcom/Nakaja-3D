import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: ({ image }) => z.object({
    slug: z.string().optional(),
    title: z.string(),
    excerpt: z.string(),
    cashPrice: z.number(),
    deposit: z.number(),
    watuPlan: z.string(),
    fortunePlan: z.string(),
    engine: z.string(),
    power: z.string(),
    torque: z.string(),
    maxLoad: z.string(),
    warranty: z.string(),
    heroImage: image().optional(),
    gallery: z.array(image()).optional(),
    whatsappText: z.string(),
    featured: z.boolean().optional().default(false),
    featuredOrder: z.number().optional(),
    featuredLabel: z.string().optional(),
    modelPath: z.string().optional(),
  })
});

export const collections = { products };
