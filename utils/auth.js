const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

const comparePassword = async (password, storedPassword) => {
  const samePassword = await bcrypt.compare(password, storedPassword);
  return samePassword;
};

const createJWT = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '48h',
  });
  return token;
};

module.exports = { cryptPassword, comparePassword, createJWT };
