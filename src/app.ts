import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { taskRouter } from "./routes/tasks.routes";
import { categoryRouter } from "./routes/categories.routes";
import { HandleErrors } from "./middlewares/handleErrors.middleware";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/tasks", taskRouter);

app.use("/categories", categoryRouter);

app.use(HandleErrors.execute);
