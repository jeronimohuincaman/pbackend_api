import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../../core/testConnection.js';

class TipoDeMovimiento extends Model { }

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
}, {
    sequelize,
    modelName: "TipoDeMovimiento",
    tableName: "tipo_de_movimientos"
});

export default TipoDeMovimiento;
