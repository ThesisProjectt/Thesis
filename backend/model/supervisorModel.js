const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Supervisor = sequelize.define('Supervisor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'supervisor',
  timestamps: false
});
const createsuper=(obj)=>{
  return Supervisor.create(obj)
}

module.exports = {Supervisor,createsuper};
