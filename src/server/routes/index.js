import express from "express";
import v1 from "./v1/index.js";

export default {
  init(server) {
    server.use("*", (req, res, next) => {
      console.log(`${req.method} request was made to: ${req.originalUrl}`);
      return next();
    });

    server.get("/api", (req, res) => {
      res.status(200).send({ pubKey: process.env.PUBKEY });
    });

    server.use("/api", v1);
  },
};
