import { verifyJwt } from "../controllers/utils/utils.js";

export default async function (req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== undefined) {
    const [bearerToken] = bearerHeader.split(" ");
    const isValid = verifyJwt(bearerToken);
    if (isValid) {
      next();
    } else {
      res.sendStatus(409);
    }
  } else {
    res.sendStatus(401);
  }
}
