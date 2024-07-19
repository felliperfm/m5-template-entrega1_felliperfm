import { z } from "zod";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean(),
    categoryId: z.number().optional()
});

export type TTask = z.infer<typeof taskSchema>;

export const createTaskBodySchema = taskSchema.omit({ id: true, finished: true });

export type TCreateTaskBody = z.infer<typeof createTaskBodySchema>;

export const editTaskBodySchema = taskSchema.omit({ id: true }).partial();

export type TEditTaskBody = z.infer<typeof editTaskBodySchema>;
