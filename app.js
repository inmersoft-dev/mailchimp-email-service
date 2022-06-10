const express = require("express");
const path = require("path");

const {
  helmet,
  cors,
  limiter,
  favicon,
  morgan,
} = require("./utils/middlewares");

// routes
const index = require("./routes/index");
const mongo = require("./routes/mongo");
const email = require("./routes/email");

const app = express();

// middle wares
// morgan
app.use(morgan.assignId);
app.use(morgan.structure);
app.use(morgan.dev);
// helmet
app.use(helmet);
// cors
app.use(cors);
// limiter
app.use(limiter); //  apply to all requests
// favicon
app.use(favicon);

app.use(express.json({ limit: 1048576 }));
app.use(express.urlencoded({ extended: false }));

/* GET home page. */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/privacy-policy", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/privacy-policy.html"));
});

// routes
app.use("/", index);
app.use("/mongo", mongo);
app.use("/email", email);

module.exports = app;
