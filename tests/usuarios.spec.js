import app from '../src/app.js';
import request from 'supertest';
import sequelize from '../src/core/testConnection.js';

let userID = null;

// Estas dos funciones las agrego porque me aparecia un error de asincronismo cuando queria realizar los tests
beforeAll(async () => {
    await sequelize.sync(); // Sincroniza las tablas antes de ejecutar los tests
});

afterAll(async () => {
    await sequelize.close(); // Cierra la conexión después de los tests
});

describe("GET /usuarios", () => {
    test("Obtener todos los usuarios", async () => {
        const response = await request(app).get("/usuarios")
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`) // Usar el token de la variable de entorno
            .send();

        expect(response.statusCode).toBe(200);
    });
});

describe("POST /usuarios", () => {
    test("Crear un nuevo usuario", async () => {
        const response = await request(app).post("/usuarios")
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`) // Usar el token de la variable de entorno
            .send({
                nombre: "prueba",
                apellido: "prueba",
                pass: "12",
                user: "test"
            });

        userID = response.body.result.idusuario;

        expect(response.statusCode).toBe(201);
    });
});

describe("GET /usuarios/:idusuario", () => {
    test("Obtener un usuario", async () => {
        const response = await request(app).get(`/usuarios/${userID}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`) // Usar el token de la variable de entorno

        expect(response.statusCode).toBe(200);
    });
});

describe("PUT /usuarios/:idusuario", () => {
    test("Editar un usuario", async () => {
        const response = await request(app).put(`/usuarios/${userID}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`) // Usar el token de la variable de entorno
            .send({
                nombre: "profe",
                apellido: "prueba",
                pass: "12",
                user: "test1"
            });

        expect(response.statusCode).toBe(200);
    });
});

describe("DELETE /usuarios/:idusuario", () => {
    test("Eliminar un usuario", async () => {
        const response = await request(app).delete(`/usuarios/${userID}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`); // Usar el token de la variable de entorno

        expect(response.statusCode).toBe(200); // Código de estado esperado para eliminación exitosa
        expect(response.body).toEqual(expect.objectContaining({
            success: true,
            message: expect.any(String)
        }));
    });
});
