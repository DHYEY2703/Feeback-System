const { validationResult, check } = require('express-validator');

const validateUserRegistration = [
  check('username', 'Username is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('phone', 'Phone number is required').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateUserRegistration };
