const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
const team =require('./teamModel')
const mission=require('./missionModel')
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
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'supervisor',
  timestamps: false
});
const createsuper=(obj)=>{
  return Supervisor.create(obj)
}
const getall=()=>{
  return Supervisor.findAll({})
}
const supernotanyteam=()=>{
   return Supervisor.findAll({
    where: {
      '$team.supervisor_id$': null 
    },
      include: [{
        model: team.Team,
        required: false, 
        attributes: [] 
      }]
    });

   
}

const findSuper=()=>{
  return Supervisor.findAll({})
}

const getsuper=(obj)=>{
  return Supervisor.findAll({where:{email:obj.email,password:obj.password}});
}
const suppermission = (id) => {
  return Supervisor.findAll({
    where: {
      id: id
    },
    include: [
      {
        model: team.Team,
        required: false,
        include: [
          {
            model: mission.Mission,
            required: false
          }
        ]
      }
    ]
  });
}



module.exports = {Supervisor,createsuper,getsuper,findSuper,getall,supernotanyteam,suppermission};
