const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../../../core/testConnection');

class Usuario extends Model { };

//Definir estructura en sequelize. Si no existe la tabla, la crea.
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
}, { sequelize, modelName: "Usuario" });

sequelize.sync();

module.exports = Usuario;