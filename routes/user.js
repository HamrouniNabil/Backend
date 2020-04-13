const express = require("express");
const userController = require("../controller/user.controller");
const { registerRules, validator } = require("../middlewares/validator");
const isAuth = require("../middlewares/passport");
const Router = express();

Router.post("/register", registerRules(), validator, userController.register);
Router.post("/login", userController.login);
Router.get("/current", isAuth(), (req, res) => res.json(req.user));

// Router.post("/register-user", async (req, res) => {
//   await userController.register(req, "User", res);
// });

// // Admin Registration Route
// Router.post("/register-admin", async (req, res) => {
//   await userController.register(req, "Admin", res);
// });

// // Super Admin Registration Route
// Router.post("/register-super-admin", async (req, res) => {
//   await userController.register(req, "Agent", res);
// });

module.exports = Router;
