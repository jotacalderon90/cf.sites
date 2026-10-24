'use strict';

const controlador = require('./lib/03.pages/controller');

module.exports = {
  /**
   * @swagger
   * /:
   *   get:
   *     tags:
   *       - Views
   *     summary: Obtener index del sitio
   *     description: Obtener index del sitio
   *     responses:
   *       200:
   *         description: Respuesta en HTML
   *         content:
   *           text/html:
   *             schema:
   *               type: string
   */
  //@route('/')
  //@method(['get'])
  index: controlador.index,

  /**
   * @swagger
   * /{path}:
   *   get:
   *     tags:
   *       - Views
   *     summary: Obtener pagina del sitio
   *     description: Obtener pagina del sitio
   *     responses:
   *       200:
   *         description: Respuesta en HTML
   *         content:
   *           text/html:
   *             schema:
   *               type: string
   */
  //@route('/:path')
  //@method(['get'])
  path: controlador.path,
};
