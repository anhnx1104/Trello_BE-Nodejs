import { StatusCodes } from "http-status-codes";
import { cardService } from "~/services/cardService";

const creareNew = async (req, res, next) => {
  try {
    console.log(req.body);

    const createCard = await cardService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createCard);
  } catch (error) {
    next(error);
  }
};

export const cardController = {
  creareNew,
};
