const express = require("express");
const userController = require("../controllers/userController");
const msgController = require("../controllers/msgController");
const router = express.Router();
const passport = require("passport");
const isAuth = require("./authMiddleware").isAuth;

/// User routes
router.get("/", msgController.index);
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

router.get("/protected-route", isAuth, (req, res, next) => {
  res.send("You made it to the route");
});

/// Msg routes
router.get("/add-msg", msgController.msgAddGet);
router.post("/add-msg", msgController.msgAddPost);

module.exports = router;
