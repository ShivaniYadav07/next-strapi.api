import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({ error: 'Email and username are required' });
    }

    const id = Math.trunc(Math.random() * 1000000);
    const account = { id };
    const secret = 'shivani12';
    const token = jwt.sign(account, secret.toString('utf-8'));

    const transporter = nodemailer.createTransport({
      service: 'ProtonMail',
      auth: {
        user: "webwwonder@protonmail.com",
        pass: "webwonder@2743",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Authentication Token',
      text: `Your authentication token is: ${token}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Token sent successfully', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
