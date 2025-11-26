const express = require("express");
const userController = require("../controllers/userController");
// const msgController = require("../controllers/msgController");
const router = express.Router();
const passport = require("passport");

/// User routes
router.get("/", (req, res, next) => {
  if (req.session.views) req.session.views++;
  else req.session.views = 1;

  res.render("index", { views: req.session.views, user: req.user });
});
router.get("/login", userController.userLoginGet);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});
router.get("/signup", userController.userAddGet);
router.post("/signup", userController.userAddPost);

router.get("/login-success", (req, res, next) => {
  res.send("<p>You successfully logged in!<p>");
});

router.get("/login-failure", (req, res, next) => {
  res.send("<p>Something Went Wrong<p>");
});

/// Msg routes

module.exports = router;
