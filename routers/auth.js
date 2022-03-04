const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

router.post(
  '/login',
  check('email', 'Please enter a vaild email').isEmail(),
  check('password', 'The password is less than 6 characters')
    .exists()
    .isLength({ min: 6 }),
  login
);

router.post(
  '/register',
  check('email', 'Please enter a vaild email').isEmail(),
  check('password', 'Password is required').exists().isLength({ min: 6 }),
  check(
    'passwordConfirmation',
    'passwordConfirmation field must have the same value as the password field'
  ),
  check('name', 'Name is required').exists().trim().escape(),
  check('location', 'location is required').exists().trim().escape(),
  register
);

module.exports = router;
