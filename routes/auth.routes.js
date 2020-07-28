const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

const router = Router();
router.post(
  "/register",
  [
    body("email", "Incorrect email").isEmail(),
    body("password", "Minimal length: 6 characters").isLength({ min: 6 }),

    body("username", "Minimal length: 6 characters")
      .optional({ checkFalsy: true })
      .isLength({ min: 6 }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: "Incorrect data for registration",
        });
      }
      const { email, password, username } = request.body;
      const candidate = username
        ? await User.findOne({ $or: [{ email }, { username }] })
        : await User.findOne({ email });
      if (candidate) {
        return response
          .status(400)
          .json({ message: "The user already exists" });
      }
      const hashedpasswd = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        username,
        password: hashedpasswd,
      });
      await user.save();
      return response.status(201).json({ message: "User created" });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: "Error, try again", code: error });
    }
    // eslint-disable-next-line comma-dangle
  }
);
router.post(
  "/login",
  [body("password", "No password provided").exists()],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      //here goes some code
      if (!errors.isEmpty()) {
        return response.status(401).json({
          errors: errors.array(),
          message: "Incorrect data",
        });
      }
      const { email, password } = request.body;
      const user = await User.findOne({
        $or: [{ email: email }, { username: email }],
      });
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response.status(401).json({ message: "Incorrect password" });
      }
      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get("jwtSecret"),
        { expiresIn: "1h" }
      );
      return response.json({ token, userId: user.id });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: "Error, try again", code: error });
    }
    // eslint-disable-next-line comma-dangle
  }
);

module.exports = router;
