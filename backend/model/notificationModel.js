const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'notification',
  timestamps: false
});
const createnot=(obj)=>{
  return Notification.create(obj)
}

module.exports = {Notification,createnot};
