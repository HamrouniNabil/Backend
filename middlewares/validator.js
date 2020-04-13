const { check, validationResult } = require('express-validator');


exports.registerRules = () => [
  check('email', 'this field is required').notEmpty(),
  check('email', 'this field should be a valid email').isEmail(),
  check('password', 'this field require 4 char min').isLength({ min: 4 }),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({ errors: errors.array() });
  }
};
