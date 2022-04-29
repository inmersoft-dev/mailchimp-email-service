const express = require("express");
const basicAuth = require("express-basic-auth");

const { uFetch } = require("../auth/users");
const getUnauthorizedResponse = require("../auth/unauthorizedResponse");

// models
const { good, error, log } = require("../models/chalk");

const emailRouter = express.Router();

const load = require("../models/loading");
const { SendEmail } = require("../services/email");

//auth system
emailRouter.use(
  basicAuth({
    users: uFetch,
    unauthorizedResponse: getUnauthorizedResponse,
  })
);

emailRouter.get("/email", (req, res) => {
  try {
    load.start();
    SendEmail();
    load.stop();
    res.send("Done");
  } catch (e) {
    error(e);
    load.stop();
    res.sendStatus(500);
  }
});

module.exports = emailRouter;
