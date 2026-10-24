'use strict';

const { z } = require('zod');

const noHtmlChars = (val) => !/[<>&"']/.test(val);
const noTextChars = (val) => !/javascript|vbscript|onerror|onload/i.test(val);

module.exports = {
  form_register: z.object({
    filecode: z.string()
      .regex(/^[a-zA-Z0-9]+$/, 'Solo se permiten letras y números')
      .max(50, 'Máximo 50 caracteres')
      .min(1, 'El campo no puede estar vacío'),
    'g-recaptcha-response':
      process.env.NODE_ENV === 'production' && process.env.RECAPTCHA_PRIVATE != ''
      ? z.string()
      : z.string().optional(),
  }).passthrough(),
};
