export default function (query) {
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
      await query("begin");

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

      await query("commit");
    } catch (e) {
      await query("rollback");
      throw new Error(e);
    }
  };

  // This can optimized a lot more
  const updateWorkoutForUser = async ({
    id,
    name,
    description,
    createdBy,
    items,
  }) => {
    try {
      await query("begin");
      await query(
        `
      update gor.workout
      set name = $1, description = $2
      where id = $3 and created_by = $4
      `,
        [name, description, id, createdBy]
      );

      let currentItems;
      let removeItems;
      let addItems;
      let updateItems;

      const { rows } = await query(
        "select id from gor.workout_item where workout_id = $1",
        [id]
      );

      currentItems = rows.map((i) => i.id);
      removeItems = currentItems.filter((ci) => !items.some((i) => i.id == ci));
      addItems = items.filter((i) => !i.id);
      updateItems = items.filter((i) => i.id == true);

      if (removeItems.length) {
        await query("delete from gor.workout_item where id in ($1)", [
          ...removeItems,
        ]);
      }

      if (addItems.length) {
        for (const item of addItems) {
          const { exerciseId, repNumber, setNumber, weight, duration } = item;
          await query(
            `
            insert into gor.workout_item (workout_id, exercise_id, weight, rep_number, set_number, duration)
            values ($1, $2, $3, $4, $5, $6)
            `,
            [id, exerciseId, weight, repNumber, setNumber, duration]
          );
        }
      }

      await query("commit");
    } catch (e) {
      await query("rollback");
      throw new Error(e);
    }

    return Promise.resolve();
  };

  return {
    insertNewUser,
    appendTokenToUserTokens,
    insertNewExercise,
    insertNewWorkoutForUser,
    updateWorkoutForUser,
  };
}
