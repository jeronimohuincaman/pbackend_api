const { Sequelize } = require('sequelize');
const config = require('./config');

/**
 * Conexion con nuestra base de datos
 */
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    port: config.port
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
