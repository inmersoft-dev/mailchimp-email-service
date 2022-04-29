const config = require("../config");

const { app, react, admin } = config;

const uFetch = {
  app,
  react,
  admin,
};

const uPost = {
  app,
  react,
  admin,
};

const onlyAdmin = {
  admin,
};

module.exports = {
  uFetch,
  uPost,
  onlyAdmin,
};
