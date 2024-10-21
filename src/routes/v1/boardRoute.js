import express from "express";
import { boardValidation } from "~/validations/boardValidation";
import { boardController } from "~/controllers/boardController";
import { StatusCodes } from "http-status-codes";
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "APi get list boardRoutes" });
  })
  .post(boardValidation.creareNew, boardController.creareNew);

export const boardRoutes = Router;
