const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'employee',
  timestamps: false
});
const getEmployee=()=>{
  return Employee.findAll({})
}
const getEmployeefree=()=>{
  return Employee.findAll({where:{team_id:null}})
}
const createEmployee=(obj)=>{
  return Employee.create(obj)
}
const updateEmpoyeeteam=(obj,id)=> {
  return Employee.update(obj, { where: {id:id} })
};



module.exports = {Employee,getEmployee,createEmployee,updateEmpoyeeteam,getEmployeefree};
