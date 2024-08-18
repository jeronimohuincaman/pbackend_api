const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Usuario = require('../../usuarios/models/usuario');

router.post('/', async (req, res) => {
    const { user, pass } = req.body;

    try {
        // Validar que los campos user y pass existan
        if (!user || !pass) {
            return res.status(400).json({ success: false, message: 'El nombre de usuario y la contraseña son requeridos.' });
        }
        // Busca el usuario en la base de datos
        const usuario = await Usuario.findOne({ where: { user: user } });

        if (!usuario) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
        }

        // Validar la contraseña
        const isPasswordValid = await bcrypt.compare(pass, usuario.pass);
        console.log('first', usuario.pass)
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas1.' });
        }

        const accessToken = jwt.sign(usuario.toJSON(), process.env.ACCESS_TOKEN, { expiresIn: '1h' });
        res.status(200).json({ success: true, result: accessToken, message: 'login establecido con exito' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Credenciales invalidas3' });
    }
});

module.exports = router;