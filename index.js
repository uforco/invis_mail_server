const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
require("dotenv").config();
const cliendss = require("./cliendsms/cliendss");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174", "https://playful-bublanina-cace48.netlify.app", ""],
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAILEADD}`,
    pass: `${process.env.ECODE}`,
  },
});

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.redirect("https://playful-bublanina-cace48.netlify.app")
});

app.post("/email", async (req, res) => {
  console.log(req.body);
  const infomaile = req.body

  const mailOnwr = {
    from: 'ufore@gmail.com',
    to: ['srka780@gmail.com'],
    subject: "invis Cliend Email", // Subject line
    html: `
    <p><strong>Company :</strong> &nbsp;${infomaile?.company}</p>

    <p><strong>Client Name :</strong>&nbsp; ${infomaile?.name}</p>
    
    <p><strong>Client contact :</strong>&nbsp; ${infomaile?.number}</p>
    
    <p><strong>Client Email :</strong> ${infomaile?.gmail}</p>
    
    <p><strong>Project Detail&nbsp;-</strong></p>
    
    <p>${infomaile?.project_detail}</p>
    `, // plain text body
  }

  const mailOptions = {
    from: 'ufore@gmail.com',
    to: [`${infomaile?.gmail}`],
    subject: "Thank you for the Email ✔", // Subject line
    html: cliendss, // html body
  }
  
  // Send the email
  transporter.sendMail(mailOnwr, (error, info) => {
    if (error) {
      console.error(error);
      res.send({mail: "mail server Error"});
    } else {
      console.log('Email sent: ' + info.response);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.send({mail: "mail server Error"});
        } else {
          console.log('Email sent: ' + info.response);
          res.send({mail: "successfully"});
        }
      });
    }
  });


  // res.send(info.messageId);







});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
