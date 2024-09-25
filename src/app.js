// Importación de dependencias
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Importar middlewares y controladores
import authenticateToken from './core/auth.verify.js'; // Middleware de autenticación
import authRouter from './modules/auth/login/controllers/login.controller.js'; // Controlador de autenticación
import usuariosRoute from './modules/auth/usuarios/controllers/usuario.controller.js';
import mediosDePagoRoute from './modules/medios_de_pago/controllers/medios_de_pago.controller.js';
import movimientoRoute from './modules/movimientos/controllers/movimiento.controller.js';
import tipoDeMovimientoRoute from './modules/tipo_de_movimientos/controllers/tipo_de_movimiento.controller.js';
import fondosRoute from './modules/fondos/controllers/fondo.controller.js';
import origenesRoute from './modules/origenes/controllers/origen.controller.js';
import pagosRoute from './modules/pagos/controllers/pago.controller.js';

// Crear instancia de la aplicación
const app = express();

// Configurar middlewares para parsear JSON y datos de formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mensaje de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({ message: '¡Bienvenidos a mi super sistema!' });
});

// Configurar rutas
app.use('/login', authRouter); // Ruta de autenticación
app.use('/movimientos', authenticateToken, movimientoRoute);
app.use('/tipo_de_movimientos', authenticateToken, tipoDeMovimientoRoute);
app.use('/medios_de_pago', authenticateToken, mediosDePagoRoute);
app.use('/fondos', authenticateToken, fondosRoute);
app.use('/origenes', authenticateToken, origenesRoute);
app.use('/usuarios', authenticateToken, usuariosRoute);
app.use('/pagos', authenticateToken, pagosRoute);

// Exportar la aplicación
export default app;
