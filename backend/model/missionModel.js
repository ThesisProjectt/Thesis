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
  progress: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  request_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  progress: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
}, {
  tableName: 'mission',
  timestamps: false
});
// add s to getMission  there is 2 gtemission
const getMission=()=>{
  return Mission.findAll({})
}



const postMissions = (obj)=>{
  return Mission.create(obj)
}
const create=(data) =>{ return Mission.create(data)};


const getMission=(id)=>{
  return Mission.findAll({ where: { team_id: id } })
}
const getAllMission=(id)=>{
  return Mission.findAll({ where: { team_id: id } })
}
const updateMission=(data,id)=>{
  return Mission.update(data,{where: {id:id}})
}

module.exports = {Mission,getMission,updateMission,getAllMission,postMissions,create}




