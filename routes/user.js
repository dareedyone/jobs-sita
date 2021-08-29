const userRouter = require("express").Router();
const userController = require("../controllers/user");

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);

module.exports = userRouter;
