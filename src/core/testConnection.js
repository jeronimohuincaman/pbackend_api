// Importar Sequelize usando import
import { Sequelize } from 'sequelize';

// Importar configuración de la base de datos
import config from './config.js';

/**
 * Conexión con nuestra base de datos
 */
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    port: config.port,
    logging: process.env.NODE_ENV === 'test' ? false : console.log, // Desactivar en test
});

/**
 * Verificamos la conexión con nuestra base de datos
 */
async function testConnection() {
    try {
        await sequelize.authenticate();
        // console.log('Conexión a la base de datos establecida con éxito...');
    } catch (error) {
        console.log('No se pudo realizar la conexión a la base de datos... Fíjate si levantaste MySQL');
    }
}

testConnection();

// Exportar la conexión sequelize usando export default
export default sequelize;
