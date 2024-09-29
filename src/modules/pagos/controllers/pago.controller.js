import express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../../../core/config.js';
import Pago from '../models/pago.js';
import Movimiento, { TiposMovimiento } from '../../movimientos/models/movimiento.js';

const router = express.Router();

// Obtener todos los registros con paginación
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página por defecto 1
    const limit = parseInt(req.query.limit) || 10; // Límite por defecto 10
    const offset = (page - 1) * limit; // Calcular el offset

    try {
        const { count, rows: pagos } = await Pago.findAndCountAll({
            offset: offset,
            limit: limit
        });

        const totalPages = Math.ceil(count / limit); // Calcular total de páginas

        const accessToken = jwt.sign({ data: pagos }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({
            success: true,
            result: pagos,
            message: 'Pagos obtenidos con éxito',
            token: accessToken,
            pagination: {
                totalItems: count,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });
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

    // Si el adjunto no esta vacio
    if (adjunto !== '') {
        // Creamos la carpeta en caso de que no exista
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        filePath = path.join(__dirname, '../uploads/');
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }

        // Obtenemos la extensión del archivo
        const ext = adjunto.substring("data:application/pdf;base64,".length, adjunto.indexOf('/'));
        const fileName = 'adjunto-' + fecha_hora + '.' + ext;
        fileLocation = path.join(filePath, fileName);

        // Generamos el archivo pdf
        const pdfBuffer = Buffer.from(adjunto.replace("data:application/pdf;base64,", ""), 'base64');
        fs.writeFileSync(fileLocation, pdfBuffer);
    }
    return fileLocation;
}

export default router;
