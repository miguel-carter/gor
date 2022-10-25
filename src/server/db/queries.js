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

  return {
    findUserByUsername,
  };
}
