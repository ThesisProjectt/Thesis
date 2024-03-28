const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pack_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    tableName: "notification",
  }
);
const createnot = (obj) => {
  return Notification.create(obj);
};

const getNotification = (id) => {
  return Notification.findAll({ where: { client_id: id } });
};

const clearAllNotifications = (id) => {
  return  Notification.destroy({ where: { client_id: id }});
}

module.exports = { Notification, createnot, getNotification, clearAllNotifications };
