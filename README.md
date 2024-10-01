# pbackend_api

Hola! Soy Jeronimo Ezequiel Huincaman y he realizado una api de gestion de finanzas personales.
EL origen de realizar esta api es agilizar el registro de mis finanzas mensuales para poder sacar estadisticas y poder mejorar el uso del dinero.
Por lo general uso algun programa de hojas de calculo para esto, pero a la larga se hace un poco tedioso. !Que lindo seria realizar un pago virtual y que automaticamente se registrase en mi excel con los datos que quiero almacenar! Bueno, este es el fin principal de esta api.
Aproveche la oportunidad de que hay que realizar una API de registros de pagos para la materia Programacion Backend para comenzar con este proyecto.
La API aun es sencilla: Cuenta con una autenticacion JWT que se utiliza para realizar las peticiones al resto de endpoints; Carga de usuarios (se encripta la contraseña al dar de alta); Registro de Pagos; Registro de Fondos; Registro de Categorias; Registro de Medios de Pago; Todos los movimientos (Egresos, Ingresos, Conversiones, Etc) se registran en una tabla comun de "Movimientos". Se integro tambien las pruebas unitarias con JEST y Supertests.


## Instrucciones para su uso
1) Levantar sevicio MySQL y APACHE
2) Moverse a la carpeta
    ```sh 
        cd pbackend_api 
    ```
3) Instalar dependencias
    ```sh
        npm i
    ```
4) Levantar servidor
    ```sh
        npm start
    ```
5) Correr test
    ```sh
        npm test
    ```

### En caso que...
...quiera hacer pruebas locales debe importar el archivo `pbackend.postman_collection.json` que contiene todas los endpoint del sistema, hasta el momento, en POSTMAN, INSOMNIA, THUNDERCLIENT, etc.

