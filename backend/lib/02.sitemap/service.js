'use strict';

const fs = require('fs');
const path = require('path');

const { DateTime } = require('luxon');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const constants = require('./constants');

const stats = function (path) {
  return new Promise(function (resolve) {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(null);
      } else {
        resolve(stats);
      }
    });
  });
};

module.exports = {
  sitemap: async function (host) {
    try {
      const pathDomain = process.cwd() + '/frontend/assets/domains/' + host;

      if (!fs.existsSync(pathDomain)) {
        throw new Error(constants.error.rest.sitemap_no_directory);
      }

      let archivos = fs.readdirSync(pathDomain, 'utf8').filter((row) => {
        return fs.statSync(path.join(pathDomain, row)).isFile() && row.indexOf('.html') > -1;
      });

      const xmls = await Promise.all(
        archivos.map(async (r) => {
          const stat = await stats(pathDomain + '/' + r);
          let fecha;
          if (stat === null) {
            fecha = '2022-01-01';
          } else {
            fecha = DateTime.fromJSDate(stat.mtime).toFormat('yyyy-MM-dd');
          }

          return (
            '<url><loc>https://' +
            host +
            '/' +
            r.replace('.html', '') +
            '</loc><lastmod>' +
            fecha +
            '</lastmod></url>'
          );
        })
      );

      return xmls.join('');
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.sitemap + ' ' + constants.error.servicio);
    }
  },
};
