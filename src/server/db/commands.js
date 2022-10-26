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
      console.log(e);
    }
  };

  return {
    insertNewUser,
    appendTokenToUserTokens,
  };
}
