const express = require('express');
const router = express.Router();
const config = require('./../../../core/config');
const jwt = require('jsonwebtoken');

const Fondo = require('../models/fondo');

// Obtener registros
router.get('/', async (req, res) => {
    try {
        const fondos = await Fondo.findAll();
        const accessToken = jwt.sign({ data: fondos }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: fondos, message: 'Fondos obtenidos con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener fondos', token: accessToken });
    }
});

// Crear registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        await Fondo.sync({ alter: true });
        const nuevoFondo = await Fondo.create({
            origen: body.origen,
            moneda: body.moneda,
            monto_moneda_base: body.monto_moneda_base,
            monto_moneda_referencia: body.monto_moneda_referencia,
            fecha: body.fecha
        });
        const accessToken = jwt.sign({ data: nuevoFondo }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevoFondo, message: 'Fondo creado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al crear el fondo', token: accessToken });
    }
});

// Obtener un solo registro
router.get('/:idfondo', async (req, res) => {
    const { idfondo } = req.params;
    try {
        const fondo = await Fondo.findByPk(idfondo);

        if (!fondo) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Fondo no encontrado', token: accessToken });
        }

        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: fondo, message: 'Fondo obtenido con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener el fondo', token: accessToken });
    }
});

// Editar registro
router.put('/:idfondo', async (req, res) => {
    const { body } = req;
    const { idfondo } = req.params;

    try {
        const fondo = await Fondo.findByPk(idfondo);

        if (!fondo) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Fondo no encontrado', token: accessToken });
        }

        await fondo.update(body);
        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: fondo, message: 'Fondo actualizado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al actualizar el fondo', token: accessToken });
    }
});

// Eliminar registro
router.delete('/:idfondo', async (req, res) => {
    const { idfondo } = req.params;
    try {
        const fondo = await Fondo.findByPk(idfondo);

        if (!fondo) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Fondo no encontrado', token: accessToken });
        }

        await fondo.destroy();
        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: fondo, message: 'Fondo eliminado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el fondo', token: accessToken });
    }
});

module.exports = router;
