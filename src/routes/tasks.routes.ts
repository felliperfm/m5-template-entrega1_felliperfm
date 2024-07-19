import { Router } from "express";
import { TaskControllers } from "../controllers/tasks.controllers";
import { container } from "tsyringe";
import { TaskServices } from "../services/tasks.services";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { createTaskBodySchema, editTaskBodySchema } from "../schemas/tasks.schemas";
import { IsTaskIdValid } from "../middlewares/isTaskIdValid.middleware";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";

container.registerSingleton("TaskServices", TaskServices);
const taskControllers = container.resolve(TaskControllers);

export const taskRouter = Router();

taskRouter.post(
    "/",
    IsCategoryIdValid.execute,
    ValidateBody.execute(createTaskBodySchema),
    (req, res) => taskControllers.create(req, res));

taskRouter.get(
    "/",
    (req, res) => taskControllers.findMany(req, res));

taskRouter.use("/:id", IsTaskIdValid.execute)
taskRouter.get(
    "/:id",
    (req, res) => taskControllers.findOne(req, res));

taskRouter.patch(
    "/:id",
    ValidateBody.execute(editTaskBodySchema),
    (req, res) => taskControllers.update(req, res));

taskRouter.delete(
    "/:id",
    (req, res) => taskControllers.delete(req, res));
