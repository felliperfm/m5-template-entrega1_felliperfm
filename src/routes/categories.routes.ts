import { Router } from "express";
import { CategoryControllers } from "../controllers/categories.controllers";
import { container } from "tsyringe";
import { CategoryServices } from "../services/categories.services";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { createCategoryBodySchema } from "../schemas/categories.schemas";
import { DoesCategoryIdExist } from "../middlewares/doesCategoryIdExist.middleware";

container.registerSingleton("CategoryServices", CategoryServices);
const categoryControllers = container.resolve(CategoryControllers);

export const categoryRouter = Router();

categoryRouter.post(
    "/",
    ValidateBody.execute(createCategoryBodySchema),
    (req, res) => categoryControllers.create(req, res));

categoryRouter.delete(
    "/:id",
    DoesCategoryIdExist.execute,
    (req, res) => categoryControllers.delete(req, res));
