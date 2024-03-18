const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updatedable: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'services',
  timestamps: false
});

module.exports = {Service};
