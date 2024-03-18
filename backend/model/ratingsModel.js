const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'ratings',
  timestamps: false
});
const getr =()=>{
  return Rating.findAll();
}
module.exports = {Rating,getr};
