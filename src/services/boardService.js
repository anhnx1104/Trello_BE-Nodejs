import { slugify } from "~/utils/formatter";

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    await newBoard.save();
    res.status(StatusCodes.CREATED).json(newBoard);
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
};
