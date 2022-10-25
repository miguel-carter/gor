export default function (query) {
  const insertNewUser = async ({ username, password }) => {
    try {
      const result = await query(
        `insert into gor.user(username, hashed_password) values($1, $2)`,
        [username, password]
      );
      return;
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    insertNewUser,
  };
}
