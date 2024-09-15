const express = require('express');
const router = express.Router();
const config = require('./../../../core/config');
const jwt = require('jsonwebtoken');

const Origen = require('../models/origen');

// Obtener todos los registros
router.get('/', async (req, res) => {
    try {
        const origenes = await Origen.findAll();
        const accessToken = jwt.sign({ data: origenes }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: origenes, message: 'Orígenes obtenidos con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener orígenes', token: accessToken });
    }
});

// Crear un nuevo registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        const nuevoOrigen = await Origen.create({
            descripcion: body.descripcion
        });
        const accessToken = jwt.sign({ data: nuevoOrigen }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevoOrigen, message: 'Origen creado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al crear el origen', token: accessToken });
    }
});

// Obtener un solo registro
router.get('/:idorigen', async (req, res) => {
    const { idorigen } = req.params;
    try {
        const origen = await Origen.findByPk(idorigen);
        if (!origen) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Origen no encontrado', token: accessToken });
        }
        const accessToken = jwt.sign({ data: origen }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: origen, message: 'Origen obtenido con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener el origen', token: accessToken });
    }
});

// Editar un registro
router.put('/:idorigen', async (req, res) => {
    const { body } = req;
    const { idorigen } = req.params;
    try {
        const origen = await Origen.findByPk(idorigen);
        if (!origen) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Origen no encontrado', token: accessToken });
        }
        await Origen.update(body, { where: { idorigen } });
        const updatedOrigen = await Origen.findByPk(idorigen);
        const accessToken = jwt.sign({ data: updatedOrigen }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: updatedOrigen, message: 'Origen actualizado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al actualizar el origen', token: accessToken });
    }
});

// Eliminar un registro
router.delete('/:idorigen', async (req, res) => {
    const { idorigen } = req.params;
    try {
        const origen = await Origen.findByPk(idorigen);
        if (!origen) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Origen no encontrado', token: accessToken });
        }
        await origen.destroy();
        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: origen, message: 'Origen eliminado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el origen', token: accessToken });
    }
});

module.exports = router;
