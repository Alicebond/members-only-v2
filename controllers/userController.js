const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.userLoginGet = asyncHandler((req, res, next) => {
  res.render("login");
});

exports.userAddGet = asyncHandler((req, res) =>
  res.render("signup", { userInfo: false, errors: false })
);

// Create a new user in database
exports.userAddPost = [
  body("firstname", "First name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastname", "Last name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Your email is not valid"),
  body("password")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Password should have at least 4 characters.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const userInfo = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPwd,
      member: req.body.member,
    };

    if (!errors.isEmpty()) {
      res.render("signup", { userInfo, errors: errors.array() });
    } else {
      await db.addNewUser(userInfo);
      res.redirect("/");
    }
  }),
];
