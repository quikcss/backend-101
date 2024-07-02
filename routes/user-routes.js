const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().not().isEmpty(),
    check("password").not().isEmpty().isLength({ min: 5 }),
  ],
  userController.signUp
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().not().isEmpty(),
    check("password").not().isEmpty().isLength({ min: 5 }),
  ],
  userController.logIn
);

module.exports = router;
