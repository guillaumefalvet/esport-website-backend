/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const debug = require('debug')('app:service:mailingService');
const nodemailer = require('nodemailer');
require('dotenv').config();
// eslint-disable-next-line arrow-body-style
const mailingService = async (data, template, sendTO, subject) => {
  const {
    email, first_name, last_name, reviewer_comment, message, path,
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
      from: process.env.EMAIL_ADDRESS,
      to: sendTO,
      subject,
      html: template,
    };
    if (process.env.EMAIL_ADDRESS === sendTO) {
      debug(`attaching....: ${path}`);
      mailOptions.attachments = [{
        filename: `application_${first_name}_${last_name}.pdf`,
        path,
        contentType: 'application/pdf',
      }];
    }
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

module.exports = mailingService;
