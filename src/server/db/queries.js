export default function (query) {
  const findUserByUsername = async (username) => {
    try {
      const result = await query(`select * from gor.user where username = $1`, [
        username,
      ]);
      const [user] = result.rows;
      return user;
    } catch (e) {
      throw new Error(e);
    }
  };

  const getExercises = async () => {
    try {
      const results = await query(
        `
        select e.id, e.name, e.description, m.name muscle
        from gor.exercise e
        inner join gor.muscle m 
        on m.id = e.target
        `,
        []
      );
      const { rows } = results;
      return rows;
    } catch (e) {
      throw new Error(e);
    }
  };

  const getAllWorkoutsForUser = async (userId) => {
    try {
      const results = await query(
        `
      select w.id, w.name, w.description, w.created_on, e.name as exercise, wi.rep_number, wi.set_number, wi.weight, wi.duration, m.name as target
      from gor.workout w
      inner join gor.workout_item wi
      on w.id = wi.workout_id
      inner join gor.exercise e
      on wi.exercise_id = e.id
      inner join gor.muscle m
      on e.target = m.id
      where created_by = $1
      `,
        [userId]
      );
      const { rows } = results;
      return rows;
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    findUserByUsername,
    getExercises,
    getAllWorkoutsForUser,
  };
}
