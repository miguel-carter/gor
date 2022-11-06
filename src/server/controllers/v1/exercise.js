import { isValid } from "../utils/utils.js";
import { commands, queries } from "../../db/index.js";

const getExercises = async (req, res, next) => {
  try {
    const exercises = await queries.getExercises();
    res.send(exercises);
  } catch (e) {
    next(e);
  }
};

const newExercise = async (req, res, next) => {
  const constraints = {
    name: {
      presence: true,
    },
    name: {
      presence: true,
    },
    description: {
      presence: false,
    },
    target: {
      presence: true,
    },
  };

  if (isValid(req.body, constraints)) {
    try {
      await commands.insertNewExercise(req.body);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(400);
  }
};

export default {
  getExercises,
  newExercise,
};
