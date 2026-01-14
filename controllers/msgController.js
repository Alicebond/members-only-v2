const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

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
  res.render("msgForm", { msgInfo: false, errors: false });
});

exports.msgAddPost = [
  body("title").trim().escape(),
  body("msg")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Post must not be empty."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const msgInfo = {
      title: req.body.title,
      msg: req.body.msg,
      userId: req.user.id,
    };

    if (!errors.isEmpty()) {
      res.render("msgForm", { msgInfo, errors: errors.array() });
    } else {
      await db.addNewMsg(msgInfo);
      res.redirect("/");
    }
  }),
];
