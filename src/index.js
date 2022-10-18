import server from "./server/index.js";
import config from "./server/config/index.js";

const app = server();
app.create(config);
app.start();
