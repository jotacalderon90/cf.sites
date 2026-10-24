'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const request = require('cl.jotacalderon.cf.framework/lib/request');

const constants = require('./constants');

module.exports = {
  form_contact: async function (input) {
    try {
      const newmail = {};
      newmail.to = input.email;
      newmail.subject = input.subject || 'Mensaje desde sitio web';
      newmail.message = input.message;
      newmail.template = input.template || 'www.form-contact.html';
      newmail.created = new Date();

      const headers = {
        'user-agent': 'cf.sites',
        origin: input.origin,
      };

      const host =
        process.env.NODE_ENV === 'production' && process.env.FRONT_MULTIDOMAIN === '1'
          ? 'https://mailing.' + input.host
          : process.env.HOST_MAILING;

      const respuesta = await request.post(
        host + '/api/mailing',
        {
          headers: headers,
        },
        {
          ...input,
          ...newmail,
        }
      );

      if (respuesta.error) {
        logger.error(respuesta);
        throw new Error(constants.error.rest.servicio_correo);
      }

      if (respuesta.data.statusCode != 200) {
        logger.error(respuesta);
        throw new Error(constants.error.rest.servicio_correo + ' ' + respuesta.data.statusCode);
      }

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.form_contact + ' ' + constants.error.servicio);
    }
  },
};
