var express = require("express");
var router = express.Router();

const dbo = require("../db/conn");

// auth
const { verifyBasic } = require("../utils/secure");

// pages
const { notFound, index, privacyPolicy } = require("../utils/pages");

const load = require("../utils/loading");
const { error, log, info, good } = require("../utils/chalk");

dbo.connectToServer((err) => {
  if (err) log(error(err));
});

/* GET home page. */
router.get("/", (req, res) => {
  res.send("Hola").status(200);
});

router.get("/privacy-policy", (req, res) => {});

router.get("/contacts", async (req, res) => {
  //! No authorization
  if (!req.headers.authorization) {
    res.send(notFound(req.baseUrl)).status(404);
    return;
  }
  //! Authorization is not basic
  if (req.headers.authorization.indexOf("Basic") === -1) {
    res.send(notFound(req.baseUrl)).status(404);
    return;
  }
  const verified = verifyBasic(req.headers.authorization);
  //! Invalid user
  if (!verified) {
    res.send(notFound(req.baseUrl)).status(404);
    return;
  }
  load.start();
  const dbConnect = dbo.getDb();
  log(info(`Fetching contacts`));
  await dbConnect
    .collection("contacts")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        log(error(`Error fetching contacts!`));
        res.status(400).send(`Error fetching contacts!`);
      } else {
        log(good("Query executed correctly"));
        res.json(result);
      }
    });
  load.stop();
});

module.exports = router;
