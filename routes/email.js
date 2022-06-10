const express = require("express");

// models
const { good, error, log } = require("../utils/chalk");

const emailRouter = express.Router();

emailRouter.get("/email", (req, res) => {
  try {
    load.start();
    load.stop();
    res.send("Done");
  } catch (e) {
    error(e);
    load.stop();
    res.sendStatus(500);
  }
});

emailRouter.get("")

module.exports = emailRouter;
