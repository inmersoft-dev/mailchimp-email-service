const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const { PORT, SENDER, PASS, APP, REACT, ADMIN } = process.env;

assert(PORT, "PORT is required");
assert(SENDER, "SENDER is required");
assert(PASS, "PASS is required");

module.exports = {
  port: PORT,
  sender: SENDER,
  pass: PASS,
  app: APP,
  react: REACT,
  admin: ADMIN,
};
