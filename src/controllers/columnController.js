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
const update = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const updatedColumn = await columnService.update(columnId, req.body);

    res.status(StatusCodes.OK).json(updatedColumn);
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  creareNew,
  update,
};
