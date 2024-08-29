# pbackend_api

1) Levantar sevicio MySQL y APACHE
2) Moverse a la carpeta
    ```bash 
        cd pbackend_api 
    ```
3) Instalar dependencias
    ```bash
        npm i
    ```
4) Levantar servidor
    ```bash
        npm start
    ```


### Login
```http
  POST localhost:3000/login
```

|  | Parameter | Type     | Description                |
|:-------- | :-------- | :------- | :------------------------- |
| Header |  `Authorization: Bearear {{token}}` | `string` | **Required**. Your API key |
| Body | `{"user": "granjero","pass":"12"}` | `JSON` | **Required**. Your API key |

### Listado de movimientos
```http
    GET localhost:3000/movimientos
```
### Obtener un solo movimiento
```http
    GET localhost:3000/movimientos/31c3b31d-75e1-4283-9c19-a7a71f5e5224
```

### Eliminar un movimiento
```http
    DELETE localhost:3000/movimientos/ac5eaef0-990e-4402-8346-7b7870dd8f45
```

### Crear un movimiento
```http
    POST localhost:3000/movimientos
```
|  | Parameter | Type     | Description                |
|:-------- | :-------- | :------- | :------------------------- |
| Header |  `Authorization: Bearear {{token}}` | `string` | **Required**. Your API key |
| Body | `{"fecha": "2024-08-18","descripcion": "Mercado","tipo": 0,"categoria": 0,"monto": "2102"}` | `JSON` | **Required**. Your API key |

### Modificar un movimiento
```http
    PUT localhost:3000/movimientos/31c3b31d-75e1-4283-9c19-a7a71f5e5224
```
|  | Parameter | Type     | Description                |
|:-------- | :-------- | :------- | :------------------------- |
| Header |  `Authorization: Bearear {{token}}` | `string` | **Required**. Your API key |
| Body | `{"fecha": "2024-08-18","descripcion": "Mercado","tipo": 0,"categoria": 0,"monto": "2102"}` | `JSON` | **Required**. Your API key |
