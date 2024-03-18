const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Pack = sequelize.define('Pack', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  varying_price: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'pack',
  timestamps: false
});

module.exports = {Pack};
