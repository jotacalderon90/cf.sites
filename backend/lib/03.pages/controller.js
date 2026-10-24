'use strict';

const fs = require('fs');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');

const domain = require('../domain');
const view = require('../view');

const constants = require('./constants');

const baseFolder = process.cwd() + '/frontend/';

const frontFolder = 'assets/domains/';

module.exports = {
  index: async function (req, res) {
    try {
      res.render(await view('index', req.headers.host), {
        __hostArchivosPublicos: domain.getHostArchivosPublicos(req),
        __sitename: req.headers.host,
      });
    } catch (error) {
      logger.error(error);
      response.renderError(
        req,
        res,
        constants.error.rest.index + ' ' + constants.error.controlador
      );
    }
  },
  path: async function (req, res, next) {
    try {
      const pathFile = frontFolder + req.headers.host + '/' + req.params.path;

      const exists = await fs.promises
        .access(baseFolder + pathFile + '.html')
        .then(() => true)
        .catch(() => false);

      if (exists) {
        response.render(req, res, pathFile, {
          __hostArchivosPublicos: domain.getHostArchivosPublicos(req),
          __sitename: req.headers.host,
        });
        return;
      }

      return next();
    } catch (error) {
      logger.error(error);
      response.renderError(req, res, constants.error.rest.path + ' ' + constants.error.controlador);
    }
  },
};
