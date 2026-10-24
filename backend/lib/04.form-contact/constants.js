'use strict';

const constants = require('../constants');

const _constants = structuredClone(constants);

_constants.error.rest.form_contact = 'Error al enviar formulario de contacto';
_constants.error.rest.servicio_correo = 'Error al consumir servicio de correo';

module.exports = _constants;
