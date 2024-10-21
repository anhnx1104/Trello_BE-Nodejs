import { StatusCodes } from "http-status-codes";
const creareNew = async (req, res, next) => {
  try {
    console.log(req.body);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Post created Controler successfully" });

    // throw new ApiError(StatusCodes.BAD_GATEWAY, "Teet err");
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  creareNew,
};
