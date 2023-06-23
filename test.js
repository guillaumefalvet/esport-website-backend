const sendEmail = require('./app/services/mailingService/templateRecruitement');
require('dotenv').config();

async function testSendMail() {
  const data = {
    email: 'victoryzone2023@gmail.com',
    firstName: 'ali',
    lastName: 'hadj',
  };
  await sendEmail(data);
}

testSendMail();
