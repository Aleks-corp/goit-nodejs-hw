export const handlerSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const handleUpdateValidator = function (next) {
  this.options.runValidators = true;
  next();
};
