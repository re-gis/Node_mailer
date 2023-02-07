const express = require("express");
const exphbs = require("express-handlebars");
const nodeMailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require('dotenv').config()

const app = express();

// View engine setup
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home page
app.get("/", (req, res) => {
  res.render("contact");
});

// Sending route
app.post("/send", (req, res) => {
  const output = `
    <p>You have new message</p>
    <h1>Contact details</h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>

    <h3>Message: ${req.body.message}</h3>

  `;

  let transpoter = nodeMailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: '"D Regis" <uregisdmc@gmail.com>',
    to: "kundwairiza@gmail.com",
    subject: "Morning",
    text: "Have nice day!",
    html: output,
  };

  transpoter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
      console.log('Not sent!');
    }

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
    res.render("contact", { msg: "Email is sent" });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
