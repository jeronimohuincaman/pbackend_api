import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../core/config.js';
import TipoDeMovimiento from '../models/tipo_de_movimiento.js';

const router = express.Router();

// Obtener registros
router.get('/', async (req, res) => {
    try {
        const tipo_de_movimientos = await TipoDeMovimiento.findAll();
        const accessToken = jwt.sign({ data: tipo_de_movimientos }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: tipo_de_movimientos, message: 'Tipo de movimiento obtenidos con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener Tipo de movimiento', token: accessToken });
    }
});

// Crear registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        await TipoDeMovimiento.sync({ alter: true });
        const nuevoTipo = await TipoDeMovimiento.create({
            descripcion: body.descripcion
        });

        const accessToken = jwt.sign({ data: nuevoTipo }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevoTipo, message: 'Tipo de movimiento creado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'El cuerpo de la solicitud no puede estar vacío.', token: accessToken });
    }
});

// Obtener un solo registro
router.get('/:idtipo', async (req, res) => {
    const { idtipo } = req.params;
    try {
        const tipo_de_movimiento = await TipoDeMovimiento.findByPk(idtipo);
        if (!tipo_de_movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Tipo de movimiento no encontrado', token: accessToken });
        }

        const accessToken = jwt.sign({ data: 'éxito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: tipo_de_movimiento, message: 'Tipo de movimiento obtenido con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener Tipo de movimiento', token: accessToken });
    }
});

// Editar registro
router.put('/:idtipo', async (req, res) => {
    const { body } = req;
    const { idtipo } = req.params;

    try {
        const tipo_de_movimiento = await TipoDeMovimiento.findByPk(idtipo);
        if (!tipo_de_movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Tipo de movimiento no encontrado', token: accessToken });
        }

        await TipoDeMovimiento.update(body, { where: { idtipo } });
        const updatedTipo = await TipoDeMovimiento.findByPk(idtipo);
        const accessToken = jwt.sign({ data: updatedTipo }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: updatedTipo, message: 'Tipo de movimiento actualizado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al actualizar el Tipo de movimiento', token: accessToken });
    }
});

// Eliminar registro
router.delete('/:idtipo', async (req, res) => {
    const { idtipo } = req.params;
    try {
        const tipo_de_movimiento = await TipoDeMovimiento.findByPk(idtipo);
        if (!tipo_de_movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Tipo de movimiento no encontrado', token: accessToken });
        }

        await tipo_de_movimiento.destroy();
        const accessToken = jwt.sign({ data: 'éxito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: tipo_de_movimiento, message: 'Tipo de movimiento eliminado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el Tipo de movimiento', token: accessToken });
    }
});

export default router;
