'use strict';

const constants = require('../constants');

const _constants = structuredClone(constants);

_constants.error.rest.form_register = 'Error al registrar formulario';
_constants.error.rest.servicio_archivosprivados = 'Error al consumir servicio de archivosprivados';

module.exports = _constants;
