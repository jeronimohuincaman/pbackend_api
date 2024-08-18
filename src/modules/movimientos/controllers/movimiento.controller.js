const express = require('express');
const router = express.Router();

const Movimiento = require('../models/movimiento');

//Obtener registros
router.get('/', async (req, res) => {
    const { query } = req;
    try {
        //Manejar caso de exito
        const movimientos = await Movimiento.findAll();
        res.status(200).json({ success: true, result: movimientos, message: 'Movimientos obtenidos con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, result: "Movimientos", message: 'Error al obtener Movimientos' });
    }
});

//Crear registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        //Manejar caso de exito
        await Movimiento.sync();
        //Encapsular datos recibidos
        const nuevoMovimiento = await Movimiento.create({
            //propiedad: valor,
            fecha: body.fecha,
            descripcion: body.descripcion,
            tipo: body.tipo,
            categoria: body.categoria,
            monto: body.monto,
        })

        res.status(201).json({ success: true, result: nuevoMovimiento, message: 'Movimiento creado con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'El cuerpo de la solicitud no puede estar vacío.' });
    }
});

//Obtener un solo registro
router.get('/:idmovimiento', async (req, res) => {
    const { idmovimiento } = req.params;
    try {
        //Manejar caso de exito
        const movimiento = await Movimiento.findByPk(idmovimiento);
        res.status(200).json({ success: true, result: movimiento, message: 'Movimiento obtenido con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'Error al obtener movimiento' });
    }
});

//Editar registro
router.put('/:idmovimiento', async (req, res) => {
    const { body } = req;
    const { idmovimiento } = req.params;

    try {
        //Manejar caso de exito
        const movimiento = await Movimiento.findByPk(idmovimiento);
        if (!movimiento) {
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado' });
        }
        //Encapsular datos recibidos
        const new_movimiento = await movimiento.update(body);
        res.status(200).json({ success: true, result: new_movimiento, message: 'Movimiento actualizado con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'Error al actualizar el movimiento' });
    }
});

//Eliminar registro
router.delete('/:idmovimiento', async (req, res) => {
    const { idmovimiento } = req.params;
    try {
        //Manejar caso de exito
        const movimiento = await Movimiento.findByPk(idmovimiento);
        if (!movimiento) {
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado' });
        }
        //Eliminamos registro
        await movimiento.destroy();
        res.status(200).json({ success: true, result: movimiento, message: 'Movimiento eliminado con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'Error al eliminar el Movimiento' });
    }
});

module.exports = router;