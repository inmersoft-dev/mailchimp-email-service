// config
const config = require("../config");

const verifyBasic = (auth) => {
  const credentials = auth.split(" ")[1];
  const base64 = Buffer.from(credentials, "base64").toString();

  const [user, pwd] = base64.split(":");
  return user === "APP" && pwd === config.appHash;
};

module.exports = {
  verifyBasic,
};
