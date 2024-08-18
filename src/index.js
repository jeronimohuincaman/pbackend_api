//Importacion de dependencias
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

//Utilizacion de dependencias
// app.use(cors());
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Importacion de controllador de rutas
const movimientos_route = require('./modules/movimientos/controllers/movimiento.controller');

//Mensaje de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({message: 'Bienvenidos a mi super sistema!'});
    });
    
//Utilizacion de controllador de rutas
app.use('/movimientos', movimientos_route);

//Verificador
app.listen(port, () => {
    console.log('corriendo en servidor en puerto:', port);
});