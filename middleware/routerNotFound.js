const CustomError = require('../errors/customError');

const routerNotFound = (err, req, res, next) => {
  if (!err) {
    const error = new CustomError('Could not found this route', 404, {
      message: 'ensure that you type a correct name :D',
    });
    throw error;
  } else {
    throw err;
  }
};

module.exports = routerNotFound;
