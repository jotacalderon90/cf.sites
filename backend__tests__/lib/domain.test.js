'use strict';

const domain = require('../../backend/lib/domain');

describe('backend/lib/domain.js', () => {
  describe('getParentDomain()', () => {
    test('debe retornar dominio padre simple', () => {
      expect(domain.getParentDomain('archivospublicos.jotace.cl')).toBe('jotace.cl');
    });

    test('debe retornar dominio padre con www', () => {
      expect(domain.getParentDomain('www.comercialastorga.cl')).toBe('comercialastorga.cl');
    });

    test('debe ignorar puerto en host', () => {
      expect(domain.getParentDomain('api.jotace.cl:3000')).toBe('jotace.cl');
    });

    test('debe funcionar con subdominios multiples', () => {
      expect(domain.getParentDomain('cdn.assets.jotace.cl')).toBe('jotace.cl');
    });
  });

  describe('getHostAccount()', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...OLD_ENV };
    });

    afterAll(() => {
      process.env = OLD_ENV;
    });

    test('debe generar host account dinamico en produccion multidominio', () => {
      process.env.NODE_ENV = 'production';
      process.env.FRONT_MULTIDOMAIN = '1';

      const req = {
        protocol: 'https',
        headers: {
          host: 'app.jotace.cl',
        },
      };

      expect(domain.getHostAccount(req)).toBe('https://account.jotace.cl');
    });

    test('debe reemplazar cualquier subdominio por account', () => {
      process.env.NODE_ENV = 'production';
      process.env.FRONT_MULTIDOMAIN = '1';

      const req = {
        protocol: 'https',
        headers: {
          host: 'clientes.comercialastorga.cl',
        },
      };

      expect(domain.getHostAccount(req)).toBe('https://account.comercialastorga.cl');
    });

    test('debe usar HOST_ACCOUNT fuera de produccion', () => {
      process.env.NODE_ENV = 'development';
      process.env.FRONT_MULTIDOMAIN = '1';
      process.env.HOST_ACCOUNT = 'http://localhost:8080';

      const req = {
        protocol: 'http',
        headers: {
          host: 'localhost:3000',
        },
      };

      expect(domain.getHostAccount(req)).toBe('http://localhost:8080');
    });

    test('debe usar HOST_ACCOUNT si FRONT_MULTIDOMAIN no es 1', () => {
      process.env.NODE_ENV = 'production';
      process.env.FRONT_MULTIDOMAIN = '0';
      process.env.HOST_ACCOUNT = 'https://account.jotace.cl';

      const req = {
        protocol: 'https',
        headers: {
          host: 'app.jotace.cl',
        },
      };

      expect(domain.getHostAccount(req)).toBe('https://account.jotace.cl');
    });
  });
});
