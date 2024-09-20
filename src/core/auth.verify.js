// Importar la librería jsonwebtoken usando import
import jwt from 'jsonwebtoken';

// Función de autenticación de token
function authenticateToken(req, res, next) {
    // Obtener el header de autorización
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Si no hay token, devolver un error de autorización
    if (!token) {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
    }

    // Verificar el token
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Su sesión ha vencido' });
        }
        // Adjuntar el usuario a la solicitud
        req.user = user;
        // Pasar al siguiente middleware
        next();
    });
}

// Exportar la función como exportación predeterminada
export default authenticateToken;
