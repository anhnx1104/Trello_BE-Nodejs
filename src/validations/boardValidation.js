import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/ApiErrors";
import { BOARD_TYPE } from "~/utils/constants";

const creareNew = async (req, res, next) => {
  const conrreactConditions = Joi.object({
    title: Joi.string().required().trim().min(2).max(50).strict(),
    description: Joi.string().required().trim().min(2).max(100).strict(),
    type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE).required(),
  });

  try {
    await conrreactConditions.validateAsync(req.body, {
      abortEarly: false, // abort validation on the first error
    });
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage
    );
    next(customError);
  }
};

export const boardValidation = {
  creareNew,
};
