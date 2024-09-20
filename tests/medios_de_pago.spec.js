import app from '../src/app.js';
import request from 'supertest';
import sequelize from '../src/core/testConnection.js';


// Estas dos funciones las agrego porque me aparecia un error de asincronismo cuando queria realizar los tests
beforeAll(async () => {
    await sequelize.sync(); // Sincroniza las tablas antes de ejecutar los tests
});

afterAll(async () => {
    await sequelize.close(); // Cierra la conexión después de los tests
});

describe("GET /medios_de_pago", () => {
    test("Obtener todos los medios_de_pago", async () => {
        const response = await request(app).get("/medios_de_pago")
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`) // Usar el token de la variable de entorno
            .send();

        expect(response.statusCode).toBe(200);
    });
});