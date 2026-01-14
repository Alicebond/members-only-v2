const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.index = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.render("index", { user: false });
  } else if (user.is_member) {
    const data = await db.getAllData();
    res.render("index", { user, data });
  } else if (user && !user.is_member) {
    const msg = await db.getAllMsg();
    res.render("index", { user, msg });
  }
});

exports.msgAddGet = asyncHandler(async (req, res, next) => {
  res.render("msgForm");
});

exports.msgAddPost = asyncHandler(async (req, res, next) => {
  const msg = req.body.msg;
  const userId = req.user.id;
  const title = req.body.title;
  await db.addNewMsg({ title, msg, userId });
  res.redirect("/");
});
