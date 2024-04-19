const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
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



module.exports = {Team,create,findTeam};
