// Cargar variables de entorno
import { config } from 'dotenv';
config();

// Exportar la configuración de la base de datos
export default {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    secretKey: process.env.ACCESS_TOKEN
};