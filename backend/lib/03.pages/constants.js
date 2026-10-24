'use strict';

const constants = require('../constants');

const _constants = structuredClone(constants);

_constants.error.rest.index = 'Error al renderizar index';
_constants.error.rest.path = 'Error al renderizar página';

module.exports = _constants;
