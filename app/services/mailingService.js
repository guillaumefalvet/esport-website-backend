/* eslint-disable no-unused-vars */
const debug = require('debug')('mail-service');
const nodemailer = require('nodemailer');
require('dotenv').config();
// eslint-disable-next-line arrow-body-style
const sendEmail = async (data, template) => {
  const {
    email, firstName, lastName, applicantTemplate,
  } = data;
  // const { email, firstName, lastName } = request.body;
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_ADDRESS,
      subject: 'Réception de la candidature',
      html: template,

    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        debug('Error sending email:', error);
        reject(error);
      } else {
        debug('Email sent:', info.messageId);
        resolve(info);
      }
    });
  });
};

module.exports = sendEmail;
