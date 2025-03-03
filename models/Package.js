const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Package = sequelize.define('Package', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 
    
}, {
    tableName: 'packages', // Specify the table name
});

module.exports = Package;