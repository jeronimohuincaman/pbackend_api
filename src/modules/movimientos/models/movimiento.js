import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../../core/testConnection.js';


// Definir las constantes para los tipos de movimiento
export const TiposMovimiento = Object.freeze({
    INGRESO: 0,
    EGRESO: 1,
    CONVERSION: 2,
    AJUSTE: 3
});

class Movimiento extends Model { }

// Definir estructura en sequelize. Si no existe la tabla, la crea.
Movimiento.init({
    idmovimiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            min: 0 // Asegura que no haya valores negativos
        }
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idtipo: { // 0: Ingreso, 1: Egreso, 2: Conversion, 3: Ajuste, 4: 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[TiposMovimiento.INGRESO, TiposMovimiento.EGRESO, TiposMovimiento.CONVERSION, TiposMovimiento.AJUSTE]]
        }
    },
    idcategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias',
            key: 'idcategoria'
        }
    },
    idusuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'idusuario'
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
    monto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Movimiento",
    tableName: "movimientos"
});

// Exportar el modelo usando export default
export default Movimiento;
