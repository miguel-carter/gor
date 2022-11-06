export default function (query, client) {
  const insertNewUser = async ({ username, password }) => {
    try {
      await query(
        `insert into gor.user(username, hashed_password) values($1, $2)`,
        [username, password]
      );
      return;
    } catch (e) {
      throw new Error(e);
    }
  };

  const appendTokenToUserTokens = async ({ token, username }) => {
    try {
      await query(
        "update gor.user set tokens = array_append(tokens, $1) where username = $2",
        [token, username]
      );
    } catch (e) {
      throw new Error(e);
    }
  };

  const insertNewExercise = async ({ name, description, target }) => {
    try {
      await query(
        "insert into gor.exercise(name, description, target) values ($1, $2, $3)",
        [name, description, target]
      );
    } catch (e) {
      throw new Error(e);
    }
  };

  const insertNewWorkoutForUser = async ({
    name,
    description,
    createdBy,
    items,
  }) => {
    try {
      await query("BEGIN");

      const { rows } = await query(
        "insert into gor.workout(name, description, created_by) values ($1, $2, $3) returning id",
        [name, description, createdBy]
      );

      const [workout] = rows;
      const workoutId = workout.id;

      for (const item of items) {
        const { exerciseId, weight, repNumber, setNumber, duration } = item;
        try {
          query(
            `
            insert into gor.workout_item (workout_id, exercise_id, weight, rep_number, set_number, duration)
            values ($1, $2, $3, $4, $5, $6)
            `,
            [workoutId, exerciseId, weight, repNumber, setNumber, duration]
          );
        } catch (e) {
          throw new Error(e);
        }
      }

      await query("COMMIT");
    } catch (e) {
      await query("ROLLBACK");
      throw new Error(e);
    }
  };

  return {
    insertNewUser,
    insertNewExercise,
    insertNewWorkoutForUser,
    appendTokenToUserTokens,
  };
}
