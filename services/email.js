let nodemailer = require("nodemailer");

// models
const { good, error } = require("../model/chalk");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@gmail.com",
    pass: "yourpassword",
  },
});

const SendEmail = (content, receiver) => {
  const mailOptions = {
    from: "youremail@gmail.com",
    to: receiver,
    subject: "Sending Email using Node.js",
    html: "<h1>That was easy!</h1>",
  };

  transporter.sendMail(mailOptions, (e, info) => {
    if (e) error(e);
    else good("Email sent: " + info.response);
  });
};

module.exports = {
  SendEmail,
};
