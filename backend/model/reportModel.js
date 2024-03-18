const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  supervisor_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'report',
  timestamps: false
});
const cr=(obj)=>{
return  Report.create(obj)
}

module.exports = {Report,cr};
