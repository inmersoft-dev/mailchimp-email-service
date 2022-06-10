const fs = require("fs");

const notFound = (route) => {
  return `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET ${route}</pre> </body> </html>`;
};

const index = () =>
  '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Document</title> </head> <body> EMAIL SERVICE KEEP OUT!!! </body> </html>';

const privacyPolicy = () => {
  const file = fs.readFileSync("./privacy-policy.html", "utf8");
  return file;
};

module.exports = {
  notFound,
  index,
  privacyPolicy,
};
