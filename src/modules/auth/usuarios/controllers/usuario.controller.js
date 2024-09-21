import express from 'express';
import config from '../../../../core/config.js';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

// Crear el router
const router = express.Router();

// Obtener registros
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();

        // Todos los datos de los usuarios, menos la contraseña
        const listadoUsuarios = usuarios.map(u => {
            return {
                idusuario: u.idusuario,
                nombre: u.nombre,
                apellido: u.apellido,
                user: u.user
            }
        });

        const accessToken = jwt.sign({ data: listadoUsuarios }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: listadoUsuarios, message: 'Usuarios obtenidos con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener usuarios', token: accessToken });
    }
});

// Crear registro
router.post('/', [
    body('nombre').isString().withMessage('El nombre debe ser un string.'),
    body('apellido').isString().withMessage('El apellido debe ser un string.'),
    body('pass').isString().withMessage('La contraseña debe ser un string.'),
    body('user').isString().withMessage('El usuario debe ser un string.')
], async (req, res) => {
    const { body } = req;
    const { nombre, apellido, pass, user } = body;

    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array()[0].msg });
    }

    try {
        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(pass, salt);

        await Usuario.sync({ alter: true });
        const nuevoUsuario = await Usuario.create({
            user: user,
            nombre: nombre,
            apellido: apellido,
            pass: hashedPass
        });

        const accessToken = jwt.sign({ data: nuevoUsuario }, config.secretKey, { expiresIn: '20m' });
        res.status(201).json({ success: true, result: nuevoUsuario, message: 'Usuario creado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al crear el usuario', token: accessToken });
    }
});

// Obtener un solo registro
router.get('/:idusuario', async (req, res) => {
    const { idusuario } = req.params;
    try {
        const usuario = await Usuario.findByPk(idusuario);

        if (!usuario) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Usuario no encontrado', token: accessToken });
        }

        // Todos los datos de los usuarios, menos la contraseña
        // Excluir la contraseña del objeto usuario
        const { pass, ...usuarioSinPass } = usuario.dataValues;

        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: usuarioSinPass, message: 'Usuario obtenido con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al obtener el usuario', token: accessToken });
    }
});

// Editar registro
router.put('/:idusuario', [
    body('nombre').isString().withMessage('El nombre debe ser un string.'),
    body('apellido').isString().withMessage('El apellido debe ser un string.'),
    body('pass').isString().withMessage('La contraseña debe ser un string.'),
    body('user').isString().withMessage('El usuario debe ser un string.')
], async (req, res) => {
    const { body } = req;
    const { idusuario } = req.params;
    const { nombre, apellido, pass, user } = body;

    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array()[0].msg });
    }


    try {
        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(pass, salt);

        // Buscar usuario
        const usuario = await Usuario.findByPk(idusuario);

        if (!usuario) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Usuario no encontrado', token: accessToken });
        }

        await Usuario.update({
            nombre: nombre,
            apellido: apellido,
            pass: hashedPass,
            user: user
        }, { where: { idusuario: idusuario } }); // Especificar el where para actualizar correctamente

        const usuarioActualizado = await Usuario.findByPk(idusuario);

        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: usuarioActualizado, message: 'Usuario actualizado con éxito', token: accessToken });
    } catch (error) {
        console.log(error)
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al actualizar el usuario', token: accessToken });
    }
});

// Eliminar registro
router.delete('/:idusuario', async (req, res) => {
    const { idusuario } = req.params;
    try {
        const usuario = await Usuario.findByPk(idusuario);

        if (!usuario) {
            const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
            return res.status(404).json({ success: false, message: 'Usuario no encontrado', token: accessToken });
        }

        await Usuario.destroy({ where: { idusuario: idusuario } }); // Especificar el where para eliminar correctamente
        const accessToken = jwt.sign({ data: 'exito' }, config.secretKey, { expiresIn: '20m' });
        res.status(200).json({ success: true, result: usuario, message: 'Usuario eliminado con éxito', token: accessToken });
    } catch (error) {
        const accessToken = jwt.sign({ data: 'error' }, config.secretKey, { expiresIn: '20m' });
        res.status(400).json({ success: false, message: 'Error al eliminar el usuario', token: accessToken });
    }
});

// Exportar el router usando export default
export default router;
