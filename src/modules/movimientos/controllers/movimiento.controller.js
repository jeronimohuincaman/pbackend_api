const express = require('express');
const router = express.Router();
const config = require('./../../../core/config');
const jwt = require('jsonwebtoken');

const Movimiento = require('../models/movimiento');

//Obtener registros
router.get('/', async (req, res) => {
    const { query } = req;
    try {
        //Manejar caso de exito
        const movimientos = await Movimiento.findAll();
        const accessToken = jwt.sign({ data: movimientos }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: movimientos, message: 'Movimientos obtenidos con exito', token: accessToken });
    } catch (error) {
        //Manejar caso de error
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, result: "Movimientos", message: 'Error al obtener Movimientos', token: accessToken });
    }
});

//Crear registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        //Manejar caso de exito
        await Movimiento.sync({ alter: true });
        //Encapsular datos recibidos
        const nuevoMovimiento = await Movimiento.create({
            //propiedad: valor,
            fecha: body.fecha,
            descripcion: body.descripcion,
            tipo: body.tipo,
            categoria: body.categoria,
            monto: body.monto,
        })

        const accessToken = jwt.sign({ data: nuevoMovimiento }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevoMovimiento, message: 'Movimiento creado con exito', token: accessToken });
    } catch (error) {
        //Manejar caso de error
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'El cuerpo de la solicitud no puede estar vacío.', token: accessToken });
    }
});

//Obtener un solo registro
router.get('/:idmovimiento', async (req, res) => {
    const { idmovimiento } = req.params;
    try {
        //Manejar caso de exito
        const movimiento = await Movimiento.findByPk(idmovimiento);

        if (!movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado', token: accessToken });
        }

        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: movimiento, message: 'Movimiento obtenido con exito', token: accessToken });
    } catch (error) {
        //Manejar caso de error
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener movimiento', token: accessToken });
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
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado', token: accessToken });
        }

        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        //Encapsular datos recibidos
        const new_movimiento = await movimiento.update(body);
        res.status(200).json({ success: true, result: new_movimiento, message: 'Movimiento actualizado con exito', token: accessToken });
    } catch (error) {
        //Manejar caso de error
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al actualizar el movimiento', token: accessToken });
    }
});

//Eliminar registro
router.delete('/:idmovimiento', async (req, res) => {
    const { idmovimiento } = req.params;
    try {
        //Manejar caso de exito
        const movimiento = await Movimiento.findByPk(idmovimiento);

        if (!movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado', token: accessToken });
        }

        //Eliminamos registro
        await movimiento.destroy();

        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: movimiento, message: 'Movimiento eliminado con exito', token: accessToken });
    } catch (error) {
        //Manejar caso de error
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el Movimiento', token: accessToken });
    }
});

module.exports = router;