const fs = require('fs');
const handlebars = require('handlebars');
const sendEmail = require('./app/services/mailingService');
require('dotenv').config();

async function testSendMail() {
  const data = {
    email: 'lesherif1952@gmail.com',
    firstName: 'ali',
    lastName: 'hadj',

  };
  const adminMail = process.env.EMAIL_ADDRESS;

  const applicantTemplate = fs.readFileSync('app/services/template/applicantTemplate.hbs', 'utf8');
  const applicantHtmlTemplate = handlebars.compile(applicantTemplate);
  const applicantHtml = applicantHtmlTemplate(data);

  const adminTemplate = fs.readFileSync('app/services/template/adminTemplate.hbs', 'utf8');
  const adminHtmlTemplate = handlebars.compile(adminTemplate);
  const adminHtml = adminHtmlTemplate(data);

  await sendEmail(data, adminHtml, adminMail);
  await sendEmail(data, applicantHtml, data.email);
}

testSendMail();
