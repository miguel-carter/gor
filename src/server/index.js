import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import { client } from "./db/index.js";

export default function () {
  let server;

  const create = (config) => {
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
      console.log(`!!! Server listening on http://${hostname} on ${port}`);
      try {
        await client.connect();
        console.log("!!! Connection established with database");
      } catch (e) {
        console.error(e);
      }
    });
  };

  return {
    create,
    start,
  };
}
