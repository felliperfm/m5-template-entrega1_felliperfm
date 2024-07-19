import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TCategory, TCreateCategoryBody } from "../schemas/categories.schemas";

@injectable()
export class CategoryServices {
    async create(body: TCreateCategoryBody): Promise<TCategory> {
        const data = await prisma.category.create({ data: body }) as TCategory;
        return data;
    };

    async delete(deleteId: string): Promise<void> {
        await prisma.category.delete({ where: { id: Number(deleteId) } });
    };
};
