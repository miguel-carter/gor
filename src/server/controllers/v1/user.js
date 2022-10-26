import {
  isValid,
  hashString,
  newError,
  hashCompare,
  newJwt,
} from "../utils/utils.js";
import { commands, queries } from "../../db/index.js";

const profile = (req, res, next) => {};

const login = async (req, res, next) => {
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
      const user = await queries.findUserByUsername(req.body.username);

      const { hashed_password, username } = user;

      const passwordIsValid = await hashCompare(
        req.body.password,
        hashed_password
      );

      if (passwordIsValid) {
        delete user.hashed_password;
        delete user.tokens;
        delete user.alternative_id;
        delete user.id;

        const token = newJwt({ user });

        try {
          await commands.appendTokenToUserTokens({ username, token });
        } catch (e) {
          next(e);
        }

        res.status(200).send({ access: token });
      } else {
        next(newError(401, "Invalid credentials"));
      }
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(400);
  }
};

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
          const newUser = Object.assign({}, req.body);
          const hashedPassword = await hashString(req.body.password);
          newUser.password = hashedPassword;
          await commands.insertNewUser(newUser);
          res.sendStatus(200);
        } catch (e) {
          next(e);
        }
      } else {
        next(newError(409, "Username already taken"));
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
