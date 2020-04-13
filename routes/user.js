const express = require("express");
const { userController } = require("../controller/user.controller");
const { registerRules, validator } = require("../middlewares/validator");
const { isAuth } = require("../middlewares/passport");

const Router = express();

Router.post("/register", registerRules(), validator, userController.register);
Router.post("/login", userController.login);
Router.get("/current", isAuth(), (req, res) => res.json(req.user));

module.exports = Router;
