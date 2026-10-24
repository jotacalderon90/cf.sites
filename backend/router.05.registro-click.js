'use strict';

const controlador = require('./lib/05.registro-click/controller');

module.exports = {
  /**
   * @swagger
   * /api/www/registro-click:
   *   post:
   *     tags:
   *       - Registro de Click
   *     summary: Ejecutado en clicks como wa.me para registro
   *     description: Ejecutado en clicks como wa.me para registro
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/www/registro-click')
  //@method(['post'])
  registro_click: controlador.registro_click,
};
