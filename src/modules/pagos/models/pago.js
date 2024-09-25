import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../../core/testConnection.js';

class Pago extends Model { }

Pago.init({
    idpago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idusuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'idusuario'
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0.01
        }
    },
    idmediopago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'medios_de_pago',
            key: 'idmediopago'
        }
    },
    idorigen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'origenes',
            key: 'idorigen'
        }
    },
    adjunto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Pago",
    tableName: "pagos"
});

export default Pago;
