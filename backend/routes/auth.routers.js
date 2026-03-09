const express = require("express");
const { login, signup, fetchMe } = require("../controllers/auth.controller");
const { verifyAuth } = require("../middlewares/verifyAuth");
const authRouter = express.Router();

authRouter.post("/login",login);
authRouter.post("/signup",signup);
authRouter.post("/logout",(req,res) => res.sendStatus(200));
authRouter.post("/refresh",(req,res) => res.sendStatus(200));
authRouter.get("/me",  verifyAuth , fetchMe);

module.exports = { authRouter }
