const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../../core/testConnection');

class Movimiento extends Model { };

//Definir estructura en sequelize. Si no existe la tabla, la crea.
Movimiento.init({
    idmovimiento: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    monto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, { sequelize, modelName: "Movimiento" });

module.exports = Movimiento;