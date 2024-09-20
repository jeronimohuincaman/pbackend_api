import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../../core/testConnection.js';

class Origen extends Model { }

Origen.init({
    idorigen: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Origen",
    tableName: "origenes"
});

export default Origen;
