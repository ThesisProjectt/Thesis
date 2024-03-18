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
const getadmin=(obj)=>{
  return Admin.findAll({where:{email:obj.email,password:obj.password}});
}

module.exports = {Admin,getadmin};
