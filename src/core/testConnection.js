const { Sequelize } = require('sequelize');

/**
 * Conexion con nuestra base de datos
 */
const sequelize = new Sequelize('pbackend_api', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

/**
 * Verificamos la conexion con nuestra base de datos
 */
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la base de datos establecida con exito...')
    } catch (error) {
        console.log('No se pudo realizar la conexion a la base de datos... Fijate si levantaste MySQL')
    }
}
testConnection();

module.exports = sequelize;
