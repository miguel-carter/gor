import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import routes from "./routes/index.js";

const { Client } = pg;

export default function () {
  let server;
  let db;
  const create = (config) => {
    db = new Client(config.dbConfig);
    server = express();
    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);
    server.use(bodyParser.json());
    routes.init(server);
  };
  const start = () => {
    const hostname = server.get("hostname");
    const port = server.get("port");
    server.listen(port, async () => {
      console.log(`Server listening on http://${hostname} on ${port}...`);
      // try {
      //   await db.connect();
      //   console.log("Database connection established...");
      // } catch (e) {
      //   console.error(e);
      // }
    });
  };

  return {
    create,
    start,
  };
}
