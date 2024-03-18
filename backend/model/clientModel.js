const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
const client = require('../controller/client');

const Client = sequelize.define('Client', {
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
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'client',
  timestamps: false
});

const getClient=()=>{
  return Client.findAll({})
}

const findOneClient = (email) => {
  return  Client.findOne({where:{email}})
}

const addClient = (data) => {
  return Client.create(data)
}

const changePass = (email, password) => {
  return  Client.update({password: password},{where:{email}});
}

const findImgClient = (id) => {
  return  Client.findOne({where:{id}})
}

const getOneClient = (id) => {
  return Client.findByPk(id)
}

const update = (id, data) => {
  return Client.update(data, {where: {id}} )
}

module.exports = {
  Client ,
  getClient, 
  addClient, 
  findOneClient, 
  changePass,
  findImgClient,
  getOneClient,
  update
};