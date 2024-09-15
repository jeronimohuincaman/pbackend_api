const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../../core/testConnection');
const Origen = require('../../origenes/models/origen');  // Asegúrate de importar el modelo Origen

class Fondo extends Model { };

// Definir estructura en sequelize. Si no existe la tabla, la crea.
Fondo.init({
    idfondo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            min: 0 // Asegura que no haya valores negativos
        }
    },
    origen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Origen, // Modelo de referencia
            key: 'idorigen' // Llave primaria en el modelo Origen
        },
        onUpdate: 'CASCADE',  // Opcional: define cómo se manejan las actualizaciones
        onDelete: 'RESTRICT'  // Opcional: define cómo se manejan los borrados
    },
    moneda: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    monto_moneda_base: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    monto_moneda_referencia: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    sequelize,
    modelName: "Fondo",
    tableName: "fondos"
});

module.exports = Fondo;
