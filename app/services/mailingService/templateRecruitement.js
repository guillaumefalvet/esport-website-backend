const debug = require('debug')('mail-service');
const nodemailer = require('nodemailer');
require('dotenv').config();
// eslint-disable-next-line arrow-body-style
const sendEmail = async (data) => {
  const { email, firstName, lastName, adminTemplate, applicantTemplate } = data;
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
      html: `
    <h1>Merci de postuler !</h1>
    <p>Cher(e) ${firstName},</p>
    <p>Nous vous remercions de l'intérêt que vous portez à rejoindre l'équipe VictoryZone. Nous avons bien reçu votre candidature et nous l'examinerons dans les plus brefs délais.</p>
    <p>Voici les détails que vous avez fournis :</p>
    <ul>
      <li><strong>Nom :</strong> ${firstName}</li>
      <li><strong>Prenom :</strong> ${lastName}</li>
      <li><strong>Email :</strong> ${email}</li>
    <p>Si votre candidature répond à nos critères, nous vous contacterons prochainement.</p>
    <p>Cordialement, La team victoryzone</p>
    <p>La Direction</p
    <img src="https://petite-hands-production.up.railway.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.08d147ce.webp&w=128&q=75" alt="Logo VictoryZone">`
      ,
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
