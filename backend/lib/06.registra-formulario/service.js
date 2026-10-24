'use strict';

const { DateTime } = require("luxon");

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const request = require('cl.jotacalderon.cf.framework/lib/request');

const constants = require('./constants');

const objectToCSVRow = function objectToCSVRow(obj, delimiter = ',') {
  // Validar que sea un objeto
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new Error('El parámetro debe ser un objeto');
  }

  // Obtener las claves ordenadas alfabéticamente
  const sortedKeys = Object.keys(obj).sort();

  // Extraer los valores en el orden de las claves ordenadas
  const values = sortedKeys.map(key => {
    const value = obj[key];
    
    // Manejar valores especiales para CSV
    if (value === null || value === undefined) {
      return '';
    }
    
    // Convertir a string
    let stringValue = String(value);
    
    // Si contiene el delimitador o comillas, escapar
    if (stringValue.includes(delimiter) || stringValue.includes('"') || stringValue.includes('\n')) {
      stringValue = `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  });

  return values.join(delimiter);
}

module.exports = {
  form_register: async function (input) {
    try {
      
      const host =
        process.env.NODE_ENV === 'production' && process.env.FRONT_MULTIDOMAIN === '1'
          ? 'https://archivosprivados.' + input.host
          : process.env.HOST_ARCHIVOSPRIVADOS;
      
      const filepath = '/archivosprivados/otros/csv/' + input.filecode + '.csv';
      
      //limpiar input para csv
      const inputFormatted = structuredClone(input);
      delete inputFormatted['g-recaptcha-response'];
      delete inputFormatted['filecode'];
      delete inputFormatted['host'];
      delete inputFormatted['origin'];
      inputFormatted.created = DateTime.now().toFormat('yyyyLLddHHmmss');
      
      const respuesta = await request.put( host + '/api/integration/put/' + Buffer.from(filepath).toString('base64'), {
        headers: {
          'user-agent': 'cf.sites',
          origin: input.origin,
        },
      } , {
        content: objectToCSVRow(inputFormatted) + '\n'
      });

      if (respuesta.error) {
        logger.error(respuesta);
        throw new Error(constants.error.rest.servicio_archivosprivados);
      }

      if (respuesta.data.statusCode != 200) {
        logger.error(respuesta);
        throw new Error(constants.error.rest.servicio_archivosprivados + ' ' + respuesta.data.statusCode);
      }

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.form_register + ' ' + constants.error.servicio);
    }
  },
};
