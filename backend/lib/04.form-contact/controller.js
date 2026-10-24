'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');
const recaptcha = require('cl.jotacalderon.cf.framework/lib/recaptcha');

const domain = require('../domain');

const constants = require('./constants');
const validator = require('./validator');
const service = require('./service');

module.exports = {
  form_contact: async function (req, res) {
    try {
      const parseResult = validator.form_contact.safeParse(req.body);

      if (!parseResult.success) {
        logger.error(parseResult);
        response.APIError(req, res, constants.error.validacion);
        return;
      }

      if (process.env.RECAPTCHA_PRIVATE) {
        await recaptcha.validate(req);
      }

      const origin = process.env.NODE_ENV === 'development' ? req.headers.host : req.headers.origin;

      await service.form_contact({
        ...parseResult.data,
        origin: origin,
        host: domain.getParentDomain(req.headers.host),
      });

      response.APISuccess(res);
    } catch (error) {
      logger.error(error);
      response.APIError(
        req,
        res,
        constants.error.rest.form_contact + ' ' + constants.error.controlador
      );
    }
  },
};
