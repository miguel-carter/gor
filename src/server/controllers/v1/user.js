import { isValid, hashString } from "../utils/utils.js";
import { commands, queries } from "../../db/index.js";

const profile = (req, res, next) => {};

const login = (req, res, next) => {};

const logout = (req, res, next) => {};

const signup = async (req, res, next) => {
  const constraints = {
    password: {
      presence: true,
    },
    username: {
      presence: true,
    },
  };

  if (isValid(req.body, constraints)) {
    try {
      const existingUser = await queries.findUserByUsername(req.body.username);
      if (!existingUser) {
        try {
          await commands.insertNewUser(req.body);
          res.sendStatus(200);
        } catch (e) {
          next(e);
        }
      } else {
        next(new Error("Username is already taken."));
      }
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(400);
  }
};

export default {
  profile,
  login,
  logout,
  signup,
};
