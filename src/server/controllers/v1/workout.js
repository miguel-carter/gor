import { isValid } from "../utils/utils.js";
import { commands, queries } from "../../db/index.js";

const newWorkoutForUser = async (req, res, next) => {
  const constraints = {
    name: {
      presence: true,
    },
    description: {
      presence: true,
    },
    items: {
      presence: true,
    },
  };

  if (isValid(req.body, constraints)) {
    const { name, description, items } = await req.body;
    const { user } = req;
    try {
      await commands.insertNewWorkoutForUser({
        name,
        description,
        createdBy: user.id,
        items,
      });

      res.status(200).send();
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(400);
  }
};

const getAllWorkoutsForUser = async (req, res, next) => {
  try {
    const workouts = [];
    const results = await queries.getAllWorkoutsForUser(req.user.id);
    results.forEach((i) => {
      if (!workouts.some((w) => w.id == i.id)) {
        workouts.push({
          id: i.id,
          name: i.name,
          description: i.description,
          createdOn: i.created_on,
          items: [
            {
              id: i.item_id,
              name: i.exercise,
              repNumber: i.rep_number,
              setNumber: i.set_number,
              weight: i.weight,
              duration: i.duration,
              target: i.target,
            },
          ],
        });
      } else {
        const index = workouts.findIndex((w) => w.id == i.id);
        workouts[index].items.push({
          id: i.item_id,
          name: i.exercise,
          repNumber: i.rep_number,
          setNumber: i.set_number,
          weight: i.weight,
          duration: i.duration,
          target: i.target,
        });
      }
    });
    res.status(200).send(workouts);
  } catch (e) {
    next(e);
  }
};

const updateWorkoutForUser = async (req, res, next) => {
  const constraints = {
    id: {
      presence: true,
    },
    name: {
      presence: true,
    },
    description: {
      presence: true,
    },
    items: {
      presence: true,
    },
  };

  if (isValid(req.body, constraints)) {
    const { user } = req;
    try {
      await commands.updateWorkoutForUser({
        ...req.body,
        createdBy: user.id,
      });

      res.status(200).send();
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(400);
  }
};

export default {
  newWorkoutForUser,
  getAllWorkoutsForUser,
  updateWorkoutForUser,
};
