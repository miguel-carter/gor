import { verifyJwt } from "../controllers/utils/utils.js";

export default async function (req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== undefined) {
    const bearerToken = bearerHeader.split(" ")[1];
    try {
      const isValid = verifyJwt(bearerToken);
      if (isValid) {
        req.user = isValid.user;
        next();
      } else {
        res.sendStatus(409);
      }
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(401);
  }
}
