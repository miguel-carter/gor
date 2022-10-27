import express from "express";
import userController from "../../controllers/v1/user.js";
import auth from "../../middleware/auth.js";

const user = express.Router();
user.get("/user", auth, userController.profile);
user.post("/user/signup", userController.signup);
user.put("/user/login", userController.login);

const v1 = express.Router();
v1.use("/v1", user);

export default v1;
