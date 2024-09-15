// Cargar variables de entorno
const config = require('./core/config');
//Importacion de dependencias
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Verificador de token
const authenticateToken = require('./core/auth.verify');

//Importacion de controllador de rutas
const auth_route = require('./modules/auth/login/controllers/login.controller');
const movimientos_route = require('./modules/movimientos/controllers/movimiento.controller');
const tipo_de_movimientos_route = require('./modules/tipo_de_movimientos/controllers/tipo_de_movimiento.controller');
const medios_de_pago_route = require('./modules/medios_de_pago/controllers/medios_de_pago.controller');
const fondos_route = require('./modules/fondos/controllers/fondo.controller');
const origenes_route = require('./modules/origenes/controllers/origen.controller');

//Mensaje de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenidos a mi super sistema!' });
});

//Utilizacion de controllador de rutas
app.use('/login', auth_route);
app.use('/movimientos', authenticateToken, movimientos_route);
app.use('/tipo_de_movimientos', authenticateToken, tipo_de_movimientos_route);
app.use('/medios_de_pago', authenticateToken, medios_de_pago_route);
app.use('/fondos', authenticateToken, fondos_route);
app.use('/origenes', authenticateToken, origenes_route);

//Verificador
app.listen(port, () => {
    console.log('corriendo en servidor en puerto:', port);
});