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

//Mensaje de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenidos a mi super sistema!' });
});

//Utilizacion de controllador de rutas
app.use('/login', auth_route);
app.use('/movimientos', authenticateToken, movimientos_route);
app.use('/tipo_de_movimientos', authenticateToken, tipo_de_movimientos_route);

//Verificador
app.listen(port, () => {
    console.log('corriendo en servidor en puerto:', port);
});