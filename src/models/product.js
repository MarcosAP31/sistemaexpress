const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa tu instancia de Sequelize

const Product = sequelize.define('Product', {
    ProductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Description: {
        type: DataTypes.STRING,
    },
    Category: {
        type: DataTypes.STRING,
    },
    Amount: {
        type: DataTypes.INTEGER,
    },
    PurchasePrice: {
        type: DataTypes.FLOAT,
    },
    SalePrice: {
        type: DataTypes.FLOAT,
    },
    /*SupplierId: {
        type: DataTypes.INTEGER,
    },*/
    Image: {
        type: DataTypes.STRING, // Utiliza BLOB para almacenar datos binarios (long para datos largos)
    },
}, {
    tableName: 'product', // Especifica el nombre exacto de la tabla en tu base de datos
    timestamps: false, // Desactiva la generación de createdAt y updatedAt
});

module.exports = Product;