// tests/sendMailUtil.test.js

// Importa el módulo de aserciones (assertions) para realizar pruebas
import assert from 'assert';
import sendMailUtil from '../util/sendMailUtil.js';

// Describe las pruebas
describe('sendMailUtil', () => {
    it('debería enviar un correo electrónico sin errores', async () => {
        const testEmail = 'correode preueba@alguncorreo.com';
        const testSubject = 'Asunto de prueba';
        const testBody = 'Cuerpo del correo de prueba';

        try {
            // Llama a la función y verifica si no hay errores
            await sendMailUtil(testEmail, testSubject, testBody);
            assert.ok(true); // La prueba pasa si no hay excepciones
        } catch (error) {
            assert.fail(`Se produjo un error: ${error}`);
        }
    });
});