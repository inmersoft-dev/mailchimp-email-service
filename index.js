const { google } = require("googleapis");

const { error, log } = require("./models/chalk");

const auth = authorize();
listLabels(auth);

function authorize() {
  const SCOPES = [
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.send",
  ];
  return new google.auth.GoogleAuth({
    keyFile: "./bot.json",
    scopes: SCOPES,
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.GoogleAuth} auth An authorized service account
 */
async function listLabels(auth) {
  try {
    const gmail = google.gmail("v1");
    google.options({ auth });

    // You can use UTF-8 encoding for the subject using the method below.
    // You can also just use a plain string if you don't need anything fancy.
    const subject = "🤘 Hello 🤘";
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
      "base64"
    )}?=`;
    const messageParts = [
      "From: Justin Beckwith <sito8943@gmail.com>",
      "To: Justin Beckwith <sito8943@gmail.com>",
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${utf8Subject}`,
      "",
      "This is a message just to say hello.",
      "So... <b>Hello!</b>  🤘❤️😎",
    ];
    const message = messageParts.join("\n");

    // The body needs to be base64url encoded.
    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
