const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Mission = sequelize.define('Mission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
const getMission=()=>{
  return Mission.findAll({})
}


module.exports = {Mission,getMission};
