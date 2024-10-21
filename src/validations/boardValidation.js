import { StatusCodes } from "http-status-codes";
import Joi from "joi";

const creareNew = async (req, res, next) => {
  const conrreactConditions = Joi.object({
    title: Joi.string().required().trim().min(2).max(50).strict(),
    description: Joi.string().required().trim().min(2).max(100).strict(),
  });

  try {
    await conrreactConditions.validateAsync(req.body, {
      abortEarly: false, // abort validation on the first error
    });
    next();
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: new Error(err).message });
  }
};

export const boardValidation = {
  creareNew,
};
