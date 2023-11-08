const express = require("express");
require('dotenv').config()
const app = express();
const port = 3000;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_FROM_PASS,
  },
});

const mailOptions = {
  from: process.env.MAIL_FROM,
  to: "example.mail@gmail.com",
  subject: "Title for your email",
  text: "Text in your letter",
};

app.use(express.json());

app.get("/send_email", (req, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return res.status(500).send("Email sent!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
