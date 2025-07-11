import { describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import updateUserRegCodeModel from '../models/users/updateUserRegCodeModel.js';
import validateUserController from '../controllers/users/validateUserController.js';

describe('validateUserController', () => {
  it('should activate user with valid registration code', async () => {
    const req = {
      params: {
        registrationCode: 'validCode',
      },
    };

    const res = {
      send: sinon.spy(),
    };

    // Mockear la función updateUserRegCodeModel para simular su comportamiento
    const updateUserRegCodeModelStub = sinon.stub(updateUserRegCodeModel);
    updateUserRegCodeModelStub.withArgs('validCode').resolves();

    await validateUserController(req, res);

    // Verificar que la función send fue llamada con el mensaje correcto
    sinon.assert.calledWithExactly(res.send, {
      status: 'ok',
      message: 'Usuario activado',
    });

    // Restaurar el stub
    updateUserRegCodeModelStub.restore();
  });

  // Otros casos de prueba según los escenarios mencionados anteriormente
});