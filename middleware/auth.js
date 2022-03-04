const jwt = require('jsonwebtoken');
const PrismaClient = require('@prisma/client');
const CustomError = require('../errors/customError');

const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    // fetch the user and save it in req
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    req.user = user;
    next();
  } catch (err) {
    throw new CustomError('Authentication Invalid', 401, {
      msg: 'Try to login',
    });
  }
};

module.exports = auth;
