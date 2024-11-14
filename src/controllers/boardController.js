import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
const creareNew = async (req, res, next) => {
  try {
    console.log(req.body);

    const createBoard = await boardService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createBoard);
  } catch (error) {
    next(error);
  }
};
const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    const board = await boardService.getDetails(boardId);

    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    const updatedBoard = await boardService.update(boardId, req.body);

    res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    next(error);
  }
};
const moveCardToDifferrentColums = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferrentColums(req.body);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
export const boardController = {
  creareNew,
  getDetails,
  update,
  moveCardToDifferrentColums,
};
