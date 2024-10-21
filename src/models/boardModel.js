/**
 * Updated by anhnx.com's author on August 10 2024
 */
import Joi from "joi";
import { ObjectId } from "mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/models/validators";
import { GET_DB } from "~/config/mongodb";
// Define Collection (name & schema)
const BOARD_COLLECTION_NAME = "boards";
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

  // Lưu ý các item trong mảng columnOrderIds là ObjectId nên cần thêm pattern cho chuẩn nhé, (lúc quay video số 57 mình quên nhưng sang đầu video số 58 sẽ có nhắc lại về cái này.)
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

const validationBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false, // abort validation on the first error
  });
};
const createNew = async (data) => {
  try {
    const validData = await validationBeforeCreate(data);
    const createdBoard = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(validData);

    return createdBoard;
  } catch (err) {
    throw new Error(err);
  }
};

const findOneById = async (id) => {
  try {
    const findBoardId = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    return findBoardId;
  } catch (err) {
    throw new Error(err);
  }
};
export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
};