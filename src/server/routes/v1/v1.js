import express from "express";
import userController from "../../controllers/v1/user.js";
import workoutController from "../../controllers/v1/workout.js";
import exerciseController from "../../controllers/v1/exercise.js";
import auth from "../../middleware/auth.js";

const user = express.Router();
user.get("/user", auth, userController.profile);
user.post("/user/signup", userController.signup);
user.put("/user/login", userController.login);

const exercise = express.Router();
exercise.get("/exercise", exerciseController.getExercises);
exercise.post("/exercise", exerciseController.newExercise);

const workout = express.Router();
workout.post("/workout", auth, workoutController.newWorkoutForUser);
workout.get("/workout", auth, workoutController.getAllWorkoutsForUser);
workout.put("/workout", auth, workoutController.updateWorkoutForUser);

const v1 = express.Router();
v1.use("/v1", user);
v1.use("/v1", exercise);
v1.use("/v1", workout);

export default v1;
