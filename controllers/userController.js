const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.userLoginGet = asyncHandler((req, res, next) => res.render("index"));
exports.userLoginPost = asyncHandler((req, res, next) => {
  const inputName = req.username,
    inputPwd = req.password;
});

// Create new user in database
exports.userAddPost = asyncHandler((req, res, next) => {});
