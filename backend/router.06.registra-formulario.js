'use strict';

const controlador = require('./lib/06.registra-formulario/controller');

module.exports = {
  /**
   * @swagger
   * /api/www/form-register:
   *   post:
   *     tags:
   *       - Form Contact
   *     summary: Recibe y registra formulario
   *     description: Recibe y registra formulario
   *     responses:
   *       200:
   *         description: Respuesta en HTML
   *         content:
   *           text/html:
   *             schema:
   *               type: string
   */
  //@route('/api/www/form-register')
  //@method(['post'])
  form_register: controlador.form_register,
};
