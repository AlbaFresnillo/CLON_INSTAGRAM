import { describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';

import insertUserModel from '../models/users/insertUserModel.js';
import * as getPoolModule from '../db/getPool.js';
import {emailAlreadyRegisteredError,userAlreadyRegisteredError} from '../services/errorService.js';
import sendMailUtil from '../util/sendMailUtil.js';

// Crear un objeto de pool de prueba (puedes considerar stubear o mockear esto según sea necesario)
const poolStub = {
  query: sinon.stub(),
};

// Stubear la función bcrypt.hash
sinon.stub(bcrypt, 'hash').resolves('hashed_password');

// Stubear la función getPool
sinon.stub(getPoolModule, 'getPool').resolves(poolStub);

// Stubear la función sendMailUtil
sinon.stub(sendMailUtil, 'default').resolves();



describe('insertUserModel', () => {
  afterEach(() => {
      sinon.restore();
  });

  it('should insert a new user if username and email are not already registered', async () => {
      // Configurar el poolStub para simular que no hay usuarios con el mismo nombre de usuario o correo electrónico
      poolStub.query.onFirstCall().resolves([[/* empty result for username check */]]);
      poolStub.query.onSecondCall().resolves([[/* empty result for email check */]]);

      // Llamar a la función insertUserModel con datos de prueba
      await insertUserModel('testUser', 'test@example.com', 'testPassword', 'testRegistrationCode');

      // Verificar que las funciones de error no se hayan llamado
      sinon.assert.notCalled(errorServiceMock.emailAlreadyRegisteredError);
      sinon.assert.notCalled(errorServiceMock.userAlreadyRegisteredError);

      // Verificar que las funciones necesarias se llamaron con los argumentos esperados
      sinon.assert.calledWithExactly(bcrypt.hash, 'testPassword', 10);
      sinon.assert.calledWithExactly(poolStub.query.firstCall, 'SELECT id FROM users WHERE username = ?', ['testUser']);
      sinon.assert.calledWithExactly(poolStub.query.secondCall, 'SELECT id FROM users WHERE email = ?', ['test@example.com']);
      sinon.assert.calledWithExactly(sendMailUtil.default, 'test@example.com', sinon.match.string, sinon.match.string);

      // Verificar que la función de inserción se llamó con los argumentos esperados
      sinon.assert.calledWithExactly(
          poolStub.query.thirdCall,
          'INSERT INTO users (id,username, email, password, registrationCode) VALUES (?,?,?,?,?)',
          [sinon.match.string, 'testUser', 'test@example.com', 'hashed_password', 'testRegistrationCode']
      );
  });
});