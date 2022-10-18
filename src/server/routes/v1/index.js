import express from "express";
import user from "./user.js";

const v1 = express.Router();
v1.use("/v1", user);

export default v1;
