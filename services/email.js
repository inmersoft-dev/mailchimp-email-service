const nodemailer = require("nodemailer");
const config = require("../config");

// models
const { good, error } = require("../models/chalk");

/**
 * It sends an email to the specified receiver with the specified subject and content
 * @param subject - The subject of the email
 * @param content - The HTML content of the email.
 * @param receiver - The email address of the person you're sending the email to.
 */
const SendEmail = (subject, content, receiver) => {};

const a = async () => {
  const subject = "Hola";
  const content = "<h1>Hola</h1>";
  const receiver = "sito8943@gmail.com";
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    secure: "true",
    auth: {
      user: config.sender,
      pass: config.pass,
    },
  });

  const mailOptions = {
    from: config.sender,
    to: receiver,
    subject: subject,
    html: content,
  };

  const verified = await transporter.verify();

  if (verified) {
    try {
      transporter.sendMail(mailOptions);
      // good("Email sent: " + info.response);
    } catch (e) {
      error(e);
    }
  } else error(verified);
};

a();

module.exports = {
  SendEmail,
};
