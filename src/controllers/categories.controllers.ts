import { inject, injectable } from "tsyringe";
import { CategoryServices } from "../services/categories.services";
import { Request, Response } from "express";

@injectable()
export class CategoryControllers {
    constructor(@inject("CategoryServices") private categoryServices: CategoryServices) {}

    async create(req: Request, res: Response) {
        const response = await this.categoryServices.create(req.body);
        return res.status(201).json(response);
    };

    async delete(req: Request, res: Response) {
        const response = await this.categoryServices.delete(req.params.id);
        return res.status(204).json();
    };
};
