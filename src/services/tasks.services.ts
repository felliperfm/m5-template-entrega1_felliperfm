import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TCreateTaskBody, TEditTaskBody, TTask } from "../schemas/tasks.schemas";

@injectable()
export class TaskServices {
    async create(body: TCreateTaskBody): Promise<TTask> {
        const data = await prisma.task.create({ data: body }) as TTask;
        return data;
    };

    async findMany(search?: string): Promise<TTask[]> {
        const data = await prisma.task.findMany({
            where: search ? {
                category: {
                    name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            } : {},
            include: {
                category: true,
            },
        }) as TTask[];
        data.forEach(task => {
            delete task.categoryId
        })
        return data;
    };

    async findOne(findId: string): Promise<TTask> {
        const data = await prisma.task.findFirst({ where: { id: Number(findId) }, include: { category: true } }) as TTask;
        delete data.categoryId
        return data;
    };

    async update(updateId: string, body: TEditTaskBody): Promise<TTask> {
        const data = await prisma.task.update({ where: { id: Number(updateId) }, data: body }) as TTask;
        return data;
    };

    async delete(deleteId: string): Promise<void> {
        await prisma.task.delete({ where: { id: Number(deleteId) } });
    };
};
