const { Sequelize } = require("sequelize")

require("dotenv").config()
const host = process.env.HOST
const database = process.env.DATABASE
const username = process.env.USER
const pwd = process.env.PWDD

const sequelize = new Sequelize(database, username, pwd, {
    host: host,
    dialect: "mysql",
  });

sequelize.authenticate()
.then(()=>{
  
    console.log('Connection has been established!')

})
.catch((error)=> {
    console.error('Unable to connect to the database:', error)
})

module.exports = sequelize