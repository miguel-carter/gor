export default {
  env: process.env || {},
  port: process.env.PORT || 3000,
  hostname: process.env.HOSTNAME || "localhost",
  dbConfig: {
    dbUser: process.env.DBUSER || "",
    dbHost: process.env.DBHOST || "",
    dbPW: process.env.DBPW || "",
    db: process.env.DB || "",
    dbPort: process.env.DBPORT || "",
  },
};
