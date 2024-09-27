import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../core/config.js';
import Categoria from '../models/categoria.js';

const router = express.Router();

// Obtener registros
router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        const accessToken = jwt.sign({ data: categorias }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: categorias, message: 'Categoria obtenidos con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener Categoria', token: accessToken });
    }
});

// Crear registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        await Categoria.sync({ alter: true });
        const nuevaCategoria = await Categoria.create({
            descripcion: body.descripcion
        });

        const accessToken = jwt.sign({ data: nuevaCategoria }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevaCategoria, message: 'Categoria creado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'El cuerpo de la solicitud no puede estar vacío.', token: accessToken });
    }
});

// Obtener un solo registro
router.get('/:idcategoria', async (req, res) => {
    const { idcategoria } = req.params;
    try {
        const categoria = await Categoria.findByPk(idcategoria);
        if (!categoria) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Categoria no encontrado', token: accessToken });
        }

        const accessToken = jwt.sign({ data: 'éxito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: categoria, message: 'Categoria obtenido con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener Categoria', token: accessToken });
    }
});

// Editar registro
router.put('/:idcategoria', async (req, res) => {
    const { body } = req;
    const { idcategoria } = req.params;

    try {
        const categoria = await Categoria.findByPk(idcategoria);
        if (!categoria) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Categoria no encontrado', token: accessToken });
        }

        await Categoria.update(body, { where: { idcategoria } });
        const updatedTipo = await Categoria.findByPk(idcategoria);
        const accessToken = jwt.sign({ data: updatedTipo }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: updatedTipo, message: 'Categoria actualizado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al actualizar el Categoria', token: accessToken });
    }
});

// Eliminar registro
router.delete('/:idcategoria', async (req, res) => {
    const { idcategoria } = req.params;
    try {
        const categoria = await Categoria.findByPk(idcategoria);
        if (!categoria) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Categoria no encontrado', token: accessToken });
        }

        await categoria.destroy();
        const accessToken = jwt.sign({ data: 'éxito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: categoria, message: 'Categoria eliminado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el Categoria', token: accessToken });
    }
});

export default router;
