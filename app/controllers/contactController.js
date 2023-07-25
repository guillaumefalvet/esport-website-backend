const debug = require('debug')('app:controllers:contactController');
const fs = require('fs');
const mailingService = require('../services/mailingService');

const adminMail = process.env.EMAIL_ADDRESS;
const jsend = {
  status: 'success',
};
const contactController = {
  async createOne(request, response) {
    debug('createOne Contact');
    const contactTemplate = fs.readFileSync('./app/services/mailingService/templates/contactTemplate.hbs', 'utf8');
    const adminTemplateContact = fs.readFileSync('./app/services/mailingService/templates/adminTemplateContact.hbs', 'utf8');

    await mailingService(request.body, adminTemplateContact, adminMail, 'Contact');
    await mailingService(request.body, contactTemplate, request.body.email, 'Contact VictoryZone');
    return response.status(200).send();
  },
};

module.exports = contactController;