export default function sendEmail(req, res) {
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      secure: "true",
      auth: {
        user: "webwwonder@protonmail.com",
        pass: "webwonder@2743",
      },
    });
    const mailData = {
      from: "Chat API",
      to: req.body.email,
      subject: `Verify your email`,
      text: req.body.message,
    };
    transporter.sendMail(mailData, function (err, info) {
      if (err)
        return res.status(500).json({ message: `an error occurred ${err}` });
      res.status(200).json({ message: info }); de
    });
  }