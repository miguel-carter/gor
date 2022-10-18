import express from "express";
const router = express.Router();

const stub = (req, res) => {
  res.status(200).send("stubbing..");
};

router.get("/user", stub);
router.post("/user/signup", stub);
router.put("/user/login", stub);

export default router;
