const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const mission=require("./missionModel");
const request=require('./requestModel')

const employee=require('./employeeModel')


const Team = sequelize.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'team',
  timestamps: false
});
const create=(obj)=>{
  return Team.create(obj)
}
const teamwithoutmission= async(date)=>{
  const teamsWithMissions = await Team.findAll({
    include: [
      {
        model: mission.Mission,
      }
    ]
  });
  const teamsWithoutMission = teamsWithMissions.filter(team => {
    if (!team.Missions || team.Missions.length === 0) {
      return true; 
    } 
  });
  return teamsWithoutMission;
}
const getteam=()=>{
  return Team.findAll({});
}


const findTeam =(id =>{
  return Team.findAll({
    where:{supervisor_id:id},
    include:[
      {
        model: employee.Employee,
      }
    ]
  })
})



module.exports = {Team,create,findTeam,teamwithoutmission,getteam};
