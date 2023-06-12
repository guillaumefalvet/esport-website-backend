const debug = require('debug')('mail-service');
const nodemailer = require('nodemailer');

const mailService = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const message = {
    from: '"victory zone" <info@victoryzone.com>',
    to: 'contact@victoryzone.com',
    subject: 'Hello',
    text: 'Hello team victoryzone',
    html: '<b>Hello team victoryzone</b>',
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      debug('Error sending email:', error);
      res.status(500).json({ error: 'An error occurred while sending the email.' });
    } else {
      debug('Email sent:', info.messageId);
      res.status(201).json({ msg: 'You should receive an email.' });
    }
  });
};

module.exports = mailService;
