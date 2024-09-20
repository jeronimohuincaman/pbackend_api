import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../../core/testConnection.js';

class MedioDePago extends Model {}

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

// Exportar el modelo usando export default
export default MedioDePago;
