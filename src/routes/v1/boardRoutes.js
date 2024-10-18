import express from "express";
import { StatusCodes } from "http-status-codes";
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "APi get list boardRoutes" });
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: "Create new boardRoutes" });
  });

export const boardRoutes = Router;
