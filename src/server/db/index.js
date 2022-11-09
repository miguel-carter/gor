import pg from "pg";
const { Client } = pg;
import config from "../config/index.js";

import makeCommands from "./commands.js";
import makeQueries from "./queries.js";

const client = new Client(config.dbConfig);

const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await client.query(text, params);
    const duration = Date.now() - start;
    // console.log("executed query", {
    //   text: text.replace("\n", ""),
    //   duration,
    //   rows: result.rowCount,
    // });
    return result;
  } catch (e) {
    console.log("failed query", { text });
    throw new Error(e);
  }
};

let commands = makeCommands(query, client);
let queries = makeQueries(query);

export { commands, queries, client };
