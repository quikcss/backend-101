const { validationResult } = require("express-validator");
const User = require("../models/user");

const signUp = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      res.json({
        message:
          "Name, email can not be blank and password must me of atleast 5 characters.",
        status: false,
      })
    );
  }
  const { name, email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch {
    (err) => {
      return next(err);
    };
  }
  if (hasUser) {
    return next(
      res.json({
        message: "User already exists with the same mail Id.",
        status: false,
      })
    );
  }
  const newUser = new User({
    name,
    email,
    password,
  });
  try {
    await newUser.save();
  } catch {
    (err) => {
      return next(err);
    };
  }
  res.status(201).json({ message: name, status: true });
};

const logIn = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      res.json({
        message:
          "Email can not be blank and password must be of atleast 5 characters.",
        status: false,
      })
    );
  }
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch {
    (err) => {
      return next(err);
    };
  }
  if (!existingUser || existingUser.password !== password) {
    return next(
      res.json({ message: "Invalid credentials enetered.", status: false })
    );
  }
  res.status(200).json({ message: existingUser.name, status: true });
};

exports.signUp = signUp;
exports.logIn = logIn;
