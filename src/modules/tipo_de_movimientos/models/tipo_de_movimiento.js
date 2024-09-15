const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../../core/testConnection');

class TipoDeMovimiento extends Model { };

//Definir estructura en sequelize. Si no existe la tabla, la crea.
TipoDeMovimiento.init({
    idtipo: {
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
}, { sequelize, modelName: "TipoDeMovimiento" });

module.exports = TipoDeMovimiento;