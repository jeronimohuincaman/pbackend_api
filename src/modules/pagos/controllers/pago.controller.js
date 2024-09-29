import express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../../../core/config.js';
import Pago from '../models/pago.js';
import Movimiento, { TiposMovimiento } from '../../movimientos/models/movimiento.js';

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
    const { adjunto, fecha_hora } = body;
    try {
        let fileLocation = convertPdf(adjunto, fecha_hora);

        const nuevoPago = await Pago.create({
            descripcion: body.descripcion,
            monto: body.monto,
            fecha_hora: body.fecha_hora,
            idusuario: body.idusuario,
            idmediopago: body.idmediopago,
            idcategoria: body.idcategoria,
            adjunto: fileLocation
        });

        if (nuevoPago.save()) {
            const nuevoMovimiento = await Movimiento.create({
                fecha_hora: body.fecha_hora,
                descripcion: body.descripcion,
                idusuario: body.idusuario,
                idcategoria: body.idcategoria,
                monto: body.monto,
                idmediopago: body.idmediopago,
                idtipo: TiposMovimiento.EGRESO,
                idpago: nuevoPago.idpago
            });

            if (!nuevoMovimiento.save()) {
                const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
                res.status(500).json({ success: false, message: 'Error al crear movimiento de pago', token: accessToken });
            }
        }

        const accessToken = jwt.sign({ data: nuevoPago }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevoPago, message: 'Pagos creado con éxito', token: accessToken });
    } catch (error) {
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
    const { adjunto, fecha_hora } = body;

    try {
        let fileLocation = convertPdf(adjunto, fecha_hora);

        const pago = await Pago.findByPk(idpago);
        if (!pago) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Pagos no encontrado', token: accessToken });
        }

        const movimiento_eliminado = await Movimiento.destroy({
            where: {
                idpago
            }
        });

        if (!movimiento_eliminado) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Error al eliminar movimento de pago', token: accessToken });
        }

        const updatedPago = await Pago.update({
            descripcion: body.descripcion,
            monto: body.monto,
            fecha_hora: body.fecha_hora,
            idusuario: body.idusuario,
            idmediopago: body.idmediopago,
            idcategoria: body.idcategoria,
            adjunto: fileLocation
        }, { where: { idpago } });

        if (updatedPago) {
            const nuevoMovimiento = await Movimiento.create({
                fecha_hora: body.fecha_hora,
                descripcion: body.descripcion,
                idusuario: body.idusuario,
                idcategoria: body.idcategoria,
                monto: body.monto,
                idmediopago: body.idmediopago,
                idtipo: TiposMovimiento.EGRESO,
                idpago: idpago
            });

            if (!nuevoMovimiento.save()) {
                const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
                res.status(500).json({ success: false, message: 'Error al crear movimiento de pago', token: accessToken });
            }
        }

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

        const movimiento_eliminado = await Movimiento.destroy({
            where: {
                idpago: parseInt(idpago)
            }
        });

        if (!movimiento_eliminado) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Error al eliminar movimento de pago', token: accessToken });
        }

        await pago.destroy();
        const accessToken = jwt.sign({ data: 'éxito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: pago, message: 'Pagos eliminado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el pago', token: accessToken });
    }
});

/**
 * Funcion encarga de convertir un base64 en pdf
 * @param {string} adjunto 
 * @param {string} fecha_hora 
 * @returns {string} @var fileLocation
 */
function convertPdf(adjunto, fecha_hora) {
    let filePath = null;
    let fileLocation = null;

    // Si el adjunto está presente
    if (adjunto) {
        // Convertir la cadena base64 en un buffer (datos binarios)
        const buffer = Buffer.from(adjunto, 'base64');

        // Obtener la ruta completa del archivo actual
        const __filename = fileURLToPath(import.meta.url);

        // Obtener la ruta del directorio actual
        const currentDirectory = path.dirname(__filename);

        // Definir la carpeta de destino para almacenar los archivos (en este caso, "uploads")
        const uploadsDir = path.join(currentDirectory, '../../../uploads/pagos');

        // Asegúrate de que la carpeta "uploads" exista, si no, créala
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        // Crear un nombre único para el archivo en formato "pago_AAAA_MM_DD.pdf"
        const date = new Date(fecha_hora);
        const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '_'); // AAAA_MM_DD
        const time = date.toTimeString().split(' ')[0].replace(/:/g, '_'); // HH_MM_SS
        const fileName = `pago_${formattedDate}_${time}.pdf`;

        // Unir la ruta de la carpeta "uploads" con el nombre del archivo
        filePath = path.join(uploadsDir, fileName);

        // Escribir el archivo en la ubicación especificada
        fs.writeFileSync(filePath, buffer);

        fileLocation = `uploads/${fileName}`;
    }

    return fileLocation;
}

export default router;
