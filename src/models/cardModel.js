import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/models/validators";
import { GET_DB } from "~/config/mongodb";
import { ObjectId } from "mongodb";

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = "cards";
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});
const IVALID_UPDATE_FIELDS = ["_id", "boardId", "updatedAt"];

const validationBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false, // abort validation on the first error
  });
};
const createNew = async (data) => {
  try {
    const validData = await validationBeforeCreate(data);
    const newCardtoAdd = {
      ...validData,
      boardId: new ObjectId(validData.boardId),
      columnId: new ObjectId(validData.columnId),
    };
    const createdCard = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .insertOne(newCardtoAdd);

    return createdCard;
  } catch (err) {
    throw new Error(err);
  }
};

const findOneById = async (id) => {
  try {
    const findBoardId = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    return findBoardId;
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (cardId, updateData) => {
  try {
    Object.keys(updateData).forEach((key) => {
      if (IVALID_UPDATE_FIELDS.includes(key)) {
        delete updateData[key];
      }
    });

    if (updateData.columnId)
      updateData.columnId = new ObjectId(updateData.columnId);

    const result = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(cardId) },
        { $set: updateData },
        { ReturnDocument: "after" }
      );
    return result;
  } catch (error) {}
};

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  update,
};
