const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../../core/testConnection');

class MedioDePago extends Model { };

// Definir estructura en sequelize. Si no existe la tabla, la crea.
MedioDePago.init({
    idmediopago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            min: 0 // Asegura que no haya valores negativos
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "MedioDePago",
    tableName: "medios_de_pago" // Opcional: define el nombre exacto de la tabla
});

module.exports = MedioDePago;
