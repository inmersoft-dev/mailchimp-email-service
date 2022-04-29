const nodemailer = require("nodemailer");
const config = require("../config");

// models
const { good, error } = require("../models/chalk");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.sender,
    pass: config.pass,
  },
});

/**
 * It sends an email to the specified receiver with the specified subject and content
 * @param subject - The subject of the email
 * @param content - The HTML content of the email.
 * @param receiver - The email address of the person you're sending the email to.
 */
const SendEmail = (subject, content, receiver) => {
  const mailOptions = {
    from: config.sender,
    to: receiver,
    subject: subject,
    html: content,
  };

  transporter.sendMail(mailOptions, (e, info) => {
    if (e) error(e);
    else good("Email sent: " + info.response);
  });
};

module.exports = {
  SendEmail,
};
