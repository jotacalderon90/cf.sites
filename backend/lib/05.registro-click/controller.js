'use strict';

const response = require('cl.jotacalderon.cf.framework/lib/response');

module.exports = {
  /*
  *20260729:
  siempre response success
  es para que quede registro en avera
  */
  registro_click: function (req, res) {
    response.APISuccess(res);
  },
};
