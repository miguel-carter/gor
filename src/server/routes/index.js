import v1 from "./v1/v1.js";

export default {
  init(server) {
    server.use("*", (req, res, next) => {
      console.log(`${req.method} request was made to: ${req.originalUrl}`);
      return next();
    });

    server.use("/api", v1);
  },
};
