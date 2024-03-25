const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Presence = sequelize.define('Presence', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'presence',
  timestamps: false
});

module.exports = {Presence};
