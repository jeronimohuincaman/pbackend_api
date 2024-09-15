const express = require('express');
const router = express.Router();
const config = require('./../../../core/config');
const jwt = require('jsonwebtoken');

const TipoDeMovimiento = require('../models/tipo_de_movimiento');

//Obtener registros
router.get('/', async (req, res) => {
    const { query } = req;
    try {
        //Manejar caso de exito
        const tipo_de_movimientos = await TipoDeMovimiento.findAll();
        const accessToken = jwt.sign({ data: tipo_de_movimientos }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: tipo_de_movimientos, message: 'Tipo de movimiento obtenidos con exito', token: accessToken });
    } catch (error) {
        //Manejar caso de error
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener Tipo de movimiento', token: accessToken });
    }
});

//Crear registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        //Manejar caso de exito
        await TipoDeMovimiento.sync({ alter: true });
        //Encapsular datos recibidos
        const nuevoTipo = await TipoDeMovimiento.create({
            //propiedad: valor,
            descripcion: body.descripcion
        })

        const accessToken = jwt.sign({ data: nuevoTipo }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevoTipo, message: 'Tipo de movimiento creado con exito', token: accessToken });
    } catch (error) {
        //Manejar caso de error
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'El cuerpo de la solicitud no puede estar vacío.', token: accessToken });
    }
});

//Obtener un solo registro
router.get('/:idtipo', async (req, res) => {
    const { idtipo } = req.params;
    try {
        //Manejar caso de exito
        const tipo_de_movimiento = await TipoDeMovimiento.findByPk(idtipo);

        if (!tipo_de_movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Tipo de movimiento no encontrado', token: accessToken });
        }

        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: tipo_de_movimiento, message: 'Tipo de movimiento obtenido con exito', token: accessToken });
    } catch (error) {
        //Manejar caso de error
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener Tipo de movimiento', token: accessToken });
    }
});

//Editar registro
router.put('/:idtipo', async (req, res) => {
    const { body } = req;
    const { idtipo } = req.params;

    try {
        //Manejar caso de exito
        const tipo_de_movimiento = await TipoDeMovimiento.findByPk(idtipo);

        if (!tipo_de_movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Tipo de movimiento no encontrado', token: accessToken });
        }

        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        //Encapsular datos recibidos
        const new_tipo_de_movimiento = await TipoDeMovimiento.update(body);
        res.status(200).json({ success: true, result: new_tipo_de_movimiento, message: 'Tipo de movimiento actualizado con exito', token: accessToken });
    } catch (error) {
        //Manejar caso de error
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al actualizar el Tipo de movimiento', token: accessToken });
    }
});

//Eliminar registro
router.delete('/:idtipo', async (req, res) => {
    const { idtipo } = req.params;
    try {
        //Manejar caso de exito
        const tipo_de_movimiento = await TipoDeMovimiento.findByPk(idtipo);

        if (!tipo_de_movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Tipo de movimiento no encontrado', token: accessToken });
        }

        //Eliminamos registro
        await tipo_de_movimiento.destroy();

        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: tipo_de_movimiento, message: 'Tipo de movimiento eliminado con exito', token: accessToken });
    } catch (error) {
        //Manejar caso de error
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el Tipo de movimiento', token: accessToken });
    }
});

module.exports = router;