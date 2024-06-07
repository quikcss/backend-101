const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch {
    (err) => {
      return next(err);
    };
  }
  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signUp = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.json({
      error:
        "Name, email can not be blank and password must me of atleast 5 characters.",
    });
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
    res
      .status(422)
      .json({ error: "User already exists with the same mail Id." });
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
  DUMMY_USERS.push(newUser);
  res.status(201).json({ newuser: newUser.toObject({ getters: true }) });
};

const logIn = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.json({
      error:
        "Email can not be blank and password must be of atleast 5 characters.",
    });
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
    res.status(401).json({ error: "Invalid credentials enetered." });
  }
  res.status(200).json({ message: "Login successful..." });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;
