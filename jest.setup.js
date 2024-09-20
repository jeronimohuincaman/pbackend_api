import request from 'supertest';
import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// Establecer NODE_ENV a test si no está configurado
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

/**
 * Esta funcion se encarga de que cuando se realizan los test se sete token en las cabeceras de las peticiones porque lleva JWT
 */
beforeAll(async () => {
    if (!process.env.AUTH_TOKEN) {
        const authResponse = await request(app)
            .post('/login')
            .send({
                user: 'granjero',
                pass: '12'
            });

        if (authResponse.body.result) {
            process.env.AUTH_TOKEN = authResponse.body.result; // Guardar el token en la variable de entorno
        } else {
            throw new Error('No se recibió un token válido'); // Lanzar un error si no hay token
        }
    }
});

