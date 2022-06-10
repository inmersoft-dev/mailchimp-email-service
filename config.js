const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const { PORT, DBRURL, APP } = process.env;

assert(PORT, "PORT is required");
assert(DBRURL, "DBRURL (database remote url) is required");

module.exports = {
  port: PORT,
  dbURL: DBRURL,
  appHash: APP,
};
