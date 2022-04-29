const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const { SENDER, PASS } = process.env;

assert(SENDER, "SENDER is required");
assert(PASS, "PASS is required");

module.exports = {
  sender: SENDER,
  pass: PASS,
};
