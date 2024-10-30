import { slugify } from "~/utils/formatter";
import { boardModel } from "~/models/boardModel";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiErrors";
import { cloneDeep } from "lodash";

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    const createBoard = await boardModel.createNew(newBoard);

    const getNewBoard = await boardModel.findOneById(createBoard.insertedId);

    return getNewBoard;
  } catch (error) {
    throw error;
  }
};
const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }

    //  sử dụng cloneDeep để kh ảnh hưởng tới board ban đầu
    const resBorad = cloneDeep(board);
    resBorad.columns.forEach((column) => {
      column.cards = resBorad.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });
    delete resBorad.cards;
    return resBorad;
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails,
};
