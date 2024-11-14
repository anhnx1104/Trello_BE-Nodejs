import express from "express";
import { columnController } from "~/controllers/columnController";
import { columnValidation } from "~/validations/columnValidation";

const Router = express.Router();

Router.route("/").post(columnValidation.creareNew, columnController.creareNew);

Router.route("/:id").put(columnValidation.update, columnController.update);

export const columnRoute = Router;
