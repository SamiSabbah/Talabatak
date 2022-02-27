const CustomError = require('../errors/customError');

const errorHandler = (err, req, res, next) => {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError('Server Error!', 500);
  }

  return res.status(customError.status).send(customError);
};

module.exports = errorHandler;
