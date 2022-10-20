export default {
  env: process.env || {},
  port: process.env.PORT || 3000,
  hostname: process.env.HOSTNAME || "localhost",
  dbConfig: {
    user: process.env.DBUSER || "",
    host: process.env.DBHOST || "",
    password: process.env.DBPW || "",
    database: process.env.DB || "",
    port: process.env.DBPORT || "",
  },
};
