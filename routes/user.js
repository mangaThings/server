const Router = require("express").Router();
const UserController = require("../controllers/user");

Router.post("/register", UserController.register);
Router.post("/login", UserController.login);
Router.post("/googleSignIn", UserController.googleSignIn);

module.exports = Router;
