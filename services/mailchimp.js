const mailchimp = require("@mailchimp/mailchimp_marketing");
const config = require("../config");

mailchimp.setConfig({
  apiKey: config.mailchimpAPI,
  server: config.mailchimpPrefix,
});

async function callPing() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

callPing();
