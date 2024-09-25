import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../core/config.js';
import Pago from '../models/pago.js';

const router = express.Router();

// Obtener todos los registros
router.get('/', async (req, res) => {
    try {
        const pagos = await Pago.findAll();
        const accessToken = jwt.sign({ data: pagos }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: pagos, message: 'Pagos obtenidos con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener pagos', token: accessToken });
    }
});

// Crear un nuevo registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        const nuevoPago = await Pago.create({
            descripcion: body.descripcion,
            monto: body.monto,
            fecha_hora: body.fecha_hora,
            idorigen: body.idorigen,
            idtipo: body.idtipo,
            idusuario: body.idusuario,
            idmediopago: body.idmediopago,
            adjunto: body.adjunto ? body.adjunto : null
        });
        const accessToken = jwt.sign({ data: nuevoPago }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevoPago, message: 'Pagos creado con éxito', token: accessToken });
    } catch (error) {
        console.log(error)
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al crear el pago', token: accessToken });
    }
});

// Obtener un solo registro
router.get('/:idpago', async (req, res) => {
    const { idpago } = req.params;
    try {
        const pago = await Pago.findByPk(idpago);
        if (!pago) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Pagos no encontrado', token: accessToken });
        }
        const accessToken = jwt.sign({ data: pago }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: pago, message: 'Pagos obtenido con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener el pago', token: accessToken });
    }
});

// Editar un registro
router.put('/:idpago', async (req, res) => {
    const { body } = req;
    const { idpago } = req.params;
    try {
        const pago = await Pago.findByPk(idpago);
        if (!pago) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Pagos no encontrado', token: accessToken });
        }
        await Pago.update(body, { where: { idpago } });
        const updatedPago = await Pago.findByPk(idpago);
        const accessToken = jwt.sign({ data: updatedPago }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: updatedPago, message: 'Pagos actualizado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al actualizar el pago', token: accessToken });
    }
});

// Eliminar un registro
router.delete('/:idpago', async (req, res) => {
    const { idpago } = req.params;
    try {
        const pago = await Pago.findByPk(idpago);
        if (!pago) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Pagos no encontrado', token: accessToken });
        }
        await pago.destroy();
        const accessToken = jwt.sign({ data: 'éxito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: pago, message: 'Pagos eliminado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el pago', token: accessToken });
    }
});

export default router;
