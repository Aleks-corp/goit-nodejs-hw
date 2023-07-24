import { ApiError } from '../helpers/index.js';

const isEmptyBodyStatus = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    next(ApiError(400, 'missing field favorite'));
  }
  next();
};

export default isEmptyBodyStatus;
