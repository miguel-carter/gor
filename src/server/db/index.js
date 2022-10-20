import pg from "pg";
const { Client } = pg;
import config from "../config/index.js";

import makeCommands from "./commands.js";
import makeQueries from "./queries.js";

const client = new Client(config.dbConfig);

const query = (text, params, callback) => {
  const start = Date.now();
  return client.query(text, params, (err, res) => {
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    callback(err, res);
  });
};

let commands = makeCommands(query);
let queries = makeQueries(query);

export default { commands, queries, client };
