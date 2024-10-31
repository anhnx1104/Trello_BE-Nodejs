import { StatusCodes } from "http-status-codes";
import { columnService } from "~/services/columnService";

const creareNew = async (req, res, next) => {
  try {
    console.log(req.body);

    const createColumn = await columnService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createColumn);
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  creareNew,
};
