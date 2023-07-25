/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const debug = require('debug')('app:service:mailingService');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
// eslint-disable-next-line arrow-body-style
/**
 * Sends an email using Nodemailer.
 *
 * @param {object} data - Data for the email.
 * @param {string} template - The HTML template for the email.
 * @param {string} sendTO - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @returns {Promise<object>} A promise that resolves to the information about the sent email.
 */
const mailingService = async (data, template, sendTO, subjectParam) => {
  const { email, first_name, last_name, reviewer_comment, message, path, subject_contact } = data;
  const compiledTemplate = handlebars.compile(template)(data);
  function envStringToBoolean() {
    if (process.env.EMAIL_IS_SECURE === 'true') {
      process.env.EMAIL_IS_SECURE = true;
    }
    if (process.env.EMAIL_IS_SECURE === 'false') {
      process.env.EMAIL_IS_SECURE = false;
    }
  }
  envStringToBoolean();

  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_IS_SECURE,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: sendTO,
      subject,
      html: compiledTemplate,
    };
    if (process.env.EMAIL_ADDRESS === sendTO && subject !== 'Contact') {
      debug(`attaching....: ${path}`);
      mailOptions.attachments = [
        {
          filename: `${path.split('/')[2]}`,
          path,
          contentType: `application/${path.toLowerCase().substring(path.lastIndexOf('.')).slice(1)}`,
        },
      ];
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
