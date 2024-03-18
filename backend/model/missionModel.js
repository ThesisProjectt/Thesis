const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Mission = sequelize.define('Mission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  request_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'mission',
  timestamps: false
});

module.exports = {Mission};
