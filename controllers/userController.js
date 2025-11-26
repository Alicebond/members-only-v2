const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.userLoginGet = asyncHandler((req, res, next) => {
  // console.log(req.session);

  res.render("login");
});
exports.userLoginPost = asyncHandler((req, res, next) => {
  const inputName = req.username,
    inputPwd = req.password;
});

exports.userAddGet = asyncHandler((req, res) => res.render("signup"));

// Create a new user in database
exports.userAddPost = asyncHandler(async (req, res, next) => {
  const hashedPwd = await bcrypt.hash(req.body.password, 10);
  const userInfo = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPwd,
    member: req.body.member,
  };

  await db.addNewUser(userInfo);
  res.redirect("/");
});
