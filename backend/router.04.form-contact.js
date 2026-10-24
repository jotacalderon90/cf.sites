'use strict';

const controlador = require('./lib/04.form-contact/controller');

module.exports = {
  /**
   * @swagger
   * /api/www/form-contact:
   *   post:
   *     tags:
   *       - Form Contact
   *     summary: Recibe formulario de contacto
   *     description: Recibe formulario de contacto
   *     responses:
   *       200:
   *         description: Respuesta en HTML
   *         content:
   *           text/html:
   *             schema:
   *               type: string
   */
  //@route('/api/www/form-contact')
  //@method(['post'])
  form_contact: controlador.form_contact,
};
