const express = require("express");
const cors = require("cors");
const path = require("path");

// models
const { log, info } = require("../model/chalk");

// routes
const post = require("../routes/post");

const app = express();

const port = 3001;

app.set("etag", "strong"); //browser caching of static assets should work properly

app.use(cors());
app.use(express.json({ limit: 1048576 }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "views")));

// gets
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// posts
app.post("/post", post);

/*app.get("/*", (req, res) => {
  //this is required to support any client side routing written in react.
  res.sendFile(path.join(__dirname, "views", "index.html"));
});*/

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Handle 404 - Keep this as a last route
app.use(function (req, res) {
  res.status(404);
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => {
  log(info(`Listening on port ${port}`));
});
