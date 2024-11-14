import { slugify } from "~/utils/formatter";
import { boardModel } from "~/models/boardModel";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiErrors";
import { cloneDeep } from "lodash";
import { columnModel } from "~/models/columnModel";
import { cardModel } from "~/models/cardModel";

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

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedBorad = await boardModel.update(boardId, updateData);

    return updatedBorad;
  } catch (error) {
    throw error;
  }
};

const moveCardToDifferrentColums = async (reqBody) => {
  try {
    // B1:cập nhật mảng cardOrderIds của Column ban đầu có chứa nó, ( bản chất là xoá cái card đó ra khỏi mảng)
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now(),
    });
    // B2: Cập nhâtk mảng cardOrderIds của Column tiếp theo (Thêm id của cards vào mảng kéo đến)
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now(),
    });
    // B3: cập nhật lại trường ColumnID mới của cái card đã kéo
    await cardModel.update(reqBody.curentCardId, {
      columnId: reqBody.nextColumnId,
    });
    return { updateResult: "Successfully" };
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferrentColums,
};
