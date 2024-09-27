import app from '../src/app.js';
import request from 'supertest';
import sequelize from '../src/core/testConnection.js';

let pagoID = null;

// Estas dos funciones las agrego porque me aparecia un error de asincronismo cuando queria realizar los tests
beforeAll(async () => {
    await sequelize.sync(); // Sincroniza las tablas antes de ejecutar los tests
});

afterAll(async () => {
    await sequelize.close(); // Cierra la conexión después de los tests
});

describe("GET /pagos", () => {
    test("Obtener todos los pagos", async () => {
        const response = await request(app).get("/pagos")
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`) // Usar el token de la variable de entorno
            .send();

        expect(response.statusCode).toBe(200);
    });
});

describe("POST /pagos", () => {
    test("Crear un nuevo pago", async () => {
        const response = await request(app).post("/pagos")
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`) // Usar el token de la variable de entorno
            .send({
                descripcion: "Pago por servicios",
                monto: 150.75,
                fecha_hora: "2024-09-20T15:30:00Z",
                idtipo: 2,
                idusuario: 6,
                idmediopago: 4,
                idcategoria: 1,
                adjunto: "" // Aquí iría un PDF en base64 si existe
            });

        pagoID = response.body.result.idpago;

        expect(response.statusCode).toBe(201);
    });
});

describe("GET /pagos/:idpago", () => {
    test("Obtener un pago por ID", async () => {
        const response = await request(app).get(`/pagos/${pagoID}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`); // Usar el token de la variable de entorno

        expect(response.statusCode).toBe(200);
    });
});

describe("PUT /pagos/:idpago", () => {
    test("Editar un pago", async () => {
        const response = await request(app).put(`/pagos/${pagoID}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`) // Usar el token de la variable de entorno
            .send({
                descripcion: "Pago editado",
                monto: 200.00,
                fecha_hora: "2024-09-20T16:00:00Z",
                idtipo: 2,
                idusuario: 6,
                idmediopago: 4,
                adjunto: "" // Archivo PDF en base64
            });

        expect(response.statusCode).toBe(200);
    });
});

describe("DELETE /pagos/:idpago", () => {
    test("Eliminar un pago", async () => {
        const response = await request(app).delete(`/pagos/${pagoID}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`); // Usar el token de la variable de entorno

        expect(response.statusCode).toBe(200);
    });
});
