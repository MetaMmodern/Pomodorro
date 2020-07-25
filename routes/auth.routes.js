const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const router = Router();
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimal length: 6 characters').isLength({ min: 6 }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data for registration',
        });
      }
      const { email, password } = request.body;
      const candidate = await User.findOne({ email });
      if (!candidate) {
        return response.status(400).json({ message: 'The user already exists' });
      }
      const hashedpasswd = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedpasswd,
      });
      await user.save();
      response.status(201).json({ message: 'User created' });
    } catch (error) {
      response.status(500).json({ message: 'Error, try again' });
    }
    return response.status(500).json({ message: 'Error, try again' });
    // eslint-disable-next-line comma-dangle
  }
);

router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists(),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data for login',
        });
      }
      const { email, password } = request.body;
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(400).json({ message: 'The user does not exist' });
      }
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response.status(400).json({ message: 'Incorrect password, try again' });
      }
      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });
      response.json({ token, userId: user.id });
    } catch (error) {
      response.status(500).json({ message: 'Error, try again' });
    }
    return response.status(500).json({ message: 'Error, try again' });
    // eslint-disable-next-line comma-dangle
  }
);

module.exports = router;
