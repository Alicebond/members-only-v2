const express = require("express");
const userController = require("../controllers/userController");
// const msgController = require("../controllers/msgController");
const router = express.Router();

/// User routes
router.get("/", userController.userLoginGet);

router.post("/", userController.userLoginPost);
router.get("/sign-up", (req, res) => res.render("sign-up"));

/// Msg routes

module.exports = router;
