// Importar Sequelize, DataTypes, Model usando import
import { Sequelize, DataTypes, Model } from 'sequelize';

// Importar la conexión a la base de datos
import sequelize from '../../../../core/testConnection.js';

// Definir la clase Usuario que extiende de Model
class Usuario extends Model { }

// Definir la estructura del modelo en Sequelize. Si no existe la tabla, la crea.
Usuario.init({
    idusuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, // Conexión a la base de datos
    modelName: "Usuario", // Nombre del modelo
    tableName: "usuarios" // Nombre de la tabla
});

// Sincronizar el modelo con la base de datos
sequelize.sync();

// Exportar el modelo Usuario usando export default
export default Usuario;
