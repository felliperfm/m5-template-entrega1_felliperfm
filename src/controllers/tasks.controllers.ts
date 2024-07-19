import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { TaskServices } from "../services/tasks.services";

@injectable()
export class TaskControllers {
    constructor(@inject("TaskServices") private taskServices: TaskServices) { }

    async create(req: Request, res: Response) {
        const response = await this.taskServices.create(req.body);
        return res.status(201).json(response);
    };

    async findMany(req: Request, res: Response) {
        const response = await this.taskServices.findMany(req.query.category as string);
        return res.status(200).json(response);
    };

    async findOne(req: Request, res: Response) {
        const response = await this.taskServices.findOne(req.params.id);
        return res.status(200).json(response);
    };

    async update(req: Request, res: Response) {
        const response = await this.taskServices.update(req.params.id, req.body);
        return res.status(200).json(response);
    };

    async delete(req: Request, res: Response) {
        await this.taskServices.delete(req.params.id);
        return res.status(204).json();
    };
};
