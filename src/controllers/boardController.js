import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
const creareNew = async (req, res, next) => {
  try {
    console.log(req.body);

    const createBoard = await boardService.createNew(req.body);

    res.status(StatusCodes.CREATED).json({ message: createBoard });
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  creareNew,
};
