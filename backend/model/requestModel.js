const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  start: {
    type: DataTypes.DATE,
    allowNull: true
  },
  end: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pack_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'request',
  timestamps: false
});
const createreq=(obj)=>{
  return Request.create(obj)
}
const getrequest=()=>{
  return Request.findAll({})
}

module.exports = {Request,createreq,getrequest};
