import validate from "validate.js";

const isValid = (attributes, constraints) => {
  if (validate(attributes, constraints) == undefined) {
    return true;
  } else {
    return false;
  }
};

export { isValid };
