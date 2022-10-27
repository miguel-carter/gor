import config from "../../config/index.js";
import validate from "validate.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const isValid = (attributes, constraints) => {
  if (validate(attributes, constraints) == undefined) {
    return true;
  } else {
    return false;
  }
};

const hashString = async (string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const ret = await bcrypt.hash(string, salt);
    return ret;
  } catch (e) {
    throw new Error(e);
  }
};

const newError = (status, message) => {
  const ret = new Error();
  ret.status = status;
  ret.message = message;
  return ret;
};

const hashCompare = async (plainText, hashedText) => {
  try {
    const ret = await bcrypt.compare(plainText, hashedText);
    return ret;
  } catch (e) {
    throw new Error(e);
  }
};

const newJwt = (info) => {
  return jwt.sign(info, config.privateKey, { expiresIn: "30 days" });
};

const verifyJwt = (token) => {
  return jwt.verify(token, config.privateKey);
};

export { isValid, hashString, newError, hashCompare, verifyJwt };
