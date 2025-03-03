const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Agency = sequelize.define('Agency', {
    agencyName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    contactNumber: { type: DataTypes.STRING, allowNull: false },
    agencyAddress: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'Agencies', // Specify the table name explicitly if needed
});

module.exports = Agency;