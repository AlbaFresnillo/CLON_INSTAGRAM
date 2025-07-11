import { describe, it, afterEach } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';

import authUserController from '../middlewares/authUserController.js';
import { invalidCredentialsError, notAuthenticatedError } from '../services/errorService.js';

// Crear un objeto de servicio de errores de prueba
const errorServiceMock = {
    notAuthenticatedError: sinon.spy(),
    invalidCredentialsError: sinon.spy(),
};



describe('authUserController', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should handle missing authorization header', async () => {
      const req = { headers: {} };
      const res = {};
      const next = sinon.spy();
  
      try {
        // Llamar al controlador de autenticación con el objeto de servicio de errores de prueba
        await authUserController(req, res, next, errorServiceMock);
  
       
        // Verificar si las funciones de error fueron llamadas correctamente
        sinon.assert.calledWithExactly(errorServiceMock.notAuthenticatedError);
        sinon.assert.calledWithExactly(next, sinon.match.instanceOf(Error));
        // Imprimir los argumentos exactos pasados al spy (si es necesario)
        console.log('Argumentos exactos pasados a notAuthenticatedError:', next.args)

      } catch (error) {
        assert.fail(error.message);
      }
    });
  
    it('should handle invalid credentials', async () => {
      const req = { headers: { authorization: 'invalid_token' } };
      const res = {};
      const next = sinon.spy();
  
      sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));
  
      try {
        // Llamar al controlador de autenticación con el objeto de servicio de errores de prueba
        await authUserController(req, res, next);
  
        // Imprimir los argumentos exactos pasados al spy
        console.log('Argumentos exactos pasados a invalidCredentialsError:', next.args);
  
        // Verificar si las funciones de error fueron llamadas correctamente
        sinon.assert.calledWithExactly(errorServiceMock.notAuthenticatedError);
        sinon.assert.calledWithExactly(errorServiceMock.invalidCredentialsError);
        sinon.assert.calledWithExactly(next, sinon.match.instanceOf(Error));
        sinon.assert.calledWithExactly(invalidCredentialsError);
      } catch (error) {
        assert.fail(error.message);
      }
    });
  });
  