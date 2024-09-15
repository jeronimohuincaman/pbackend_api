const express = require('express');
const router = express.Router();
const config = require('../../../core/config');
const jwt = require('jsonwebtoken');

const MedioDePago = require('../models/medio_de_pago');

// Obtener registros
router.get('/', async (req, res) => {
    try {
        const medios_de_pago = await MedioDePago.findAll();
        const accessToken = jwt.sign({ data: medios_de_pago }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: medios_de_pago, message: 'Medios de pago obtenidos con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener medios de pago', token: accessToken });
    }
});

// Crear registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        await MedioDePago.sync({ alter: true });
        const nuevoMedio = await MedioDePago.create({
            descripcion: body.descripcion
        });

        const accessToken = jwt.sign({ data: nuevoMedio }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevoMedio, message: 'Medio de pago creado con éxito', token: accessToken });
    } catch (error) {
        console.log(error)
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al crear el medio de pago', token: accessToken });
    }
});

// Obtener un solo registro
router.get('/:idmediopago', async (req, res) => {
    const { idmediopago } = req.params;
    try {
        const medio_de_pago = await MedioDePago.findByPk(idmediopago);

        if (!medio_de_pago) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Medio de pago no encontrado', token: accessToken });
        }

        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: medio_de_pago, message: 'Medio de pago obtenido con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener el medio de pago', token: accessToken });
    }
});

// Editar registro
router.put('/:idmediopago', async (req, res) => {
    const { body } = req;
    const { idmediopago } = req.params;

    try {
        const medio_de_pago = await MedioDePago.findByPk(idmediopago);

        if (!medio_de_pago) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Medio de pago no encontrado', token: accessToken });
        }

        await medio_de_pago.update(body);
        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: medio_de_pago, message: 'Medio de pago actualizado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al actualizar el medio de pago', token: accessToken });
    }
});

// Eliminar registro
router.delete('/:idmediopago', async (req, res) => {
    const { idmediopago } = req.params;
    try {
        const medio_de_pago = await MedioDePago.findByPk(idmediopago);

        if (!medio_de_pago) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Medio de pago no encontrado', token: accessToken });
        }

        await medio_de_pago.destroy();
        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: medio_de_pago, message: 'Medio de pago eliminado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el medio de pago', token: accessToken });
    }
});

module.exports = router;
