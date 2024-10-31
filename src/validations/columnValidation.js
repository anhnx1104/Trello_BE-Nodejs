import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/ApiErrors";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/models/validators";

const creareNew = async (req, res, next) => {
  const conrreactConditions = Joi.object({
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),

    title: Joi.string().required().min(3).max(50).trim().strict(),
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

export const columnValidation = {
  creareNew,
};
