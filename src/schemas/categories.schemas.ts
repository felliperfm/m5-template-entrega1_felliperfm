import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1)
});

export type TCategory = z.infer<typeof categorySchema>;

export const createCategoryBodySchema = categorySchema.omit({ id: true });

export type TCreateCategoryBody = z.infer<typeof createCategoryBodySchema>;
