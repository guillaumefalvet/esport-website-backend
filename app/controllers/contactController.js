const debug = require('debug')('app:controllers:contactController');
const fs = require('fs');
const mailingService = require('../services/mailingService');

const adminMail = process.env.EMAIL_ADDRESS;

const contactController = {
  async createOne(request, response) {
    debug('createOne Contact');
    request.body.subject_contact = request.body.subject;
    const adminTemplateContact = fs.readFileSync('./app/services/mailingService/templates/adminTemplateContact.hbs', 'utf8');
    await mailingService(request.body, adminTemplateContact, adminMail, 'Contact');
    if (request.body.copy) {
      const contactTemplate = fs.readFileSync('./app/services/mailingService/templates/contactTemplate.hbs', 'utf8');
      await mailingService(request.body, contactTemplate, request.body.email, 'Contact VictoryZone');
    }
    return response.status(201).send();
  },
};

module.exports = contactController;
