import { StatusCodes } from "http-status-codes";

const creareNew = async (req, res, next) => {
  try {
    console.log(req.body);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Post created Controler successfully" });
  } catch (error) {
    next(error);
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errors: error.message });
  }
};

export const boardController = {
  creareNew,
};
