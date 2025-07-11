/* Esta utilidad es útil para asegurar que los objetos cumplan con ciertas restricciones
o esquemas antes de ser procesador en la aplicación */

const validateSchemaUtil = async (schema, body) => {
    try {
        await schema.validateAsync(body);
    } catch (error) {
        error.httpStatus = 400; // Bad request
        error.code = 'MISSING_FIELDS';
        throw error;
    }
};

export default validateSchemaUtil;