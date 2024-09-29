import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../core/config.js';
import Movimiento from '../models/movimiento.js';

const router = express.Router();

// Obtener registros
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Parámetros de paginación desde la solicitud

    try {
        // Calcular el offset
        const offset = (page - 1) * limit;

        // Consulta con paginación
        const movimientos = await Movimiento.findAndCountAll({
            limit: parseInt(limit),  // Límite de resultados por página
            offset: parseInt(offset)  // Cuántos registros saltar
        });

        const accessToken = jwt.sign({ data: movimientos }, config.secretKey, { expiresIn: '20m' });
        const pagination = { totalPages: Math.ceil(movimientos.count / limit), currentPage: parseInt(page), totalItems: movimientos.count };

        res.status(200).json({ success: true, result: movimientos.rows, message: 'Movimientos obtenidos con éxito', token: accessToken, pagination: pagination });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, result: "Movimientos", message: 'Error al obtener movimientos', token: accessToken });
    }
});

// Crear registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        await Movimiento.sync({ alter: true });
        const nuevoMovimiento = await Movimiento.create({
            fecha: body.fecha,
            descripcion: body.descripcion,
            tipo: body.tipo,
            categoria: body.categoria,
            monto: body.monto,
        });

        const accessToken = jwt.sign({ data: nuevoMovimiento }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevoMovimiento, message: 'Movimiento creado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'El cuerpo de la solicitud no puede estar vacío.', token: accessToken });
    }
});

// Obtener un solo registro
router.get('/:idmovimiento', async (req, res) => {
    const { idmovimiento } = req.params;
    try {
        const movimiento = await Movimiento.findByPk(idmovimiento);

        if (!movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado', token: accessToken });
        }

        const accessToken = jwt.sign({ data: 'éxito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: movimiento, message: 'Movimiento obtenido con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener movimiento', token: accessToken });
    }
});

// Editar registro
router.put('/:idmovimiento', async (req, res) => {
    const { body } = req;
    const { idmovimiento } = req.params;

    try {
        const movimiento = await Movimiento.findByPk(idmovimiento);
        if (!movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado', token: accessToken });
        }

        const new_movimiento = await movimiento.update(body);
        const accessToken = jwt.sign({ data: 'éxito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: new_movimiento, message: 'Movimiento actualizado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al actualizar el movimiento', token: accessToken });
    }
});

// Eliminar registro
router.delete('/:idmovimiento', async (req, res) => {
    const { idmovimiento } = req.params;
    try {
        const movimiento = await Movimiento.findByPk(idmovimiento);

        if (!movimiento) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Movimiento no encontrado', token: accessToken });
        }

        await movimiento.destroy();
        const accessToken = jwt.sign({ data: 'éxito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: movimiento, message: 'Movimiento eliminado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el movimiento', token: accessToken });
    }
});

export default router;
