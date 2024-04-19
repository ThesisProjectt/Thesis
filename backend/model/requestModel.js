const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
const mission =require('./missionModel')
const client=require('./clientModel')
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
const getonlyrequest=()=>{
  return Request.findAll({
    where: {
      '$Mission.request_id$': null
    },
    include: [{
      model: mission.Mission,
      required: false, 
    },
  ]
  })
}
const deleted=(id)=>{
  return Request.destroy({where:{id:id}})}
module.exports = {Request,createreq,getrequest,getonlyrequest,deleted};
