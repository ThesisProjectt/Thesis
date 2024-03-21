const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  request_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'paiement',
  timestamps: false
});

module.exports = {Payment};
