const { DataTypes, where } = require('sequelize');
const sequelize = require('../database/index');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'admin',
  timestamps: false
});
const getadmin=()=>{
  return Admin.findAll({});
}
const findOneadmin = (email) => {
  return  Admin.findOne({where:{email}})
}


module.exports = {Admin,getadmin,findOneadmin};
