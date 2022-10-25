import { isValid } from "../utils/utils.js";

const profile = (req, res, next) => {};

const login = (req, res, next) => {};

const logout = (req, res, next) => {};

const signup = (req, res, next) => {
  const constraints = {
    password: {
      presence: true,
    },
    username: {
      presence: true,
    },
  };

  if (isValid(req.body, constraints)) {
    res.sendStatus(200);
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
