const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const CustomError = require('../errors/customError');

const prisma = new PrismaClient();

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError('Not valid inputs!', 400, { errors: errors.array() });
  }

  const { email, password, passwordConfirmation, name } = req.body;
  const salt = await bcrypt.genSalt();
  const user = prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, salt),
      passwordConfirmation,
      name,
    },
  });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new NotFoundError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(req.body.password);

  if (!isPasswordCorrect) {
    throw new AuthenticationError('Invalid credentials');
  }

  const { _id: id, name, profileImage } = user;
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    id,
    token,
    name,
    profileImage,
  });
};

module.exports = { register, login };
