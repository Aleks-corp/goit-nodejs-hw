import { isValidObjectId } from 'mongoose';
import { ApiError } from '../helpers/index.js';

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(ApiError(400, `${contactId} is not valid id`));
  }
  next();
};
export default isValidId;
