// Importar los módulos necesarios usando import
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Importar el modelo de Usuario
import Usuario from '../../usuarios/models/usuario.js';

// Crear el router
const router = express.Router();

// Ruta para el inicio de sesión
router.post('/', async (req, res) => {
    const { user, pass } = req.body;

    try {
        // Validar que los campos user y pass existan
        if (!user || !pass) {
            return res.status(400).json({ success: false, message: 'El nombre de usuario y la contraseña son requeridos.' });
        }

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findOne({ where: { user } });

        if (!usuario) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
        }

        // Validar la contraseña
        const isPasswordValid = await bcrypt.compare(pass, usuario.pass);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
        }

        // Generar el token de acceso
        const accessToken = jwt.sign(usuario.toJSON(), process.env.ACCESS_TOKEN, { expiresIn: '1h' });

        // Enviar la respuesta exitosa con el token de acceso
        res.status(200).json({ success: true, result: accessToken, message: 'Sesión establecida con éxito' });
    } catch (error) {
        // Manejar error y enviar respuesta
        res.status(400).json({ success: false, message: 'Credenciales inválidas' });
    }
});

// Exportar el router usando export default
export default router;
