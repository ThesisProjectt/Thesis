const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
const mission=require('./missionModel')
const request=require('./requestModel')
const pack=require('./packModel')
const team=require('./teamModel')
const s=require('./servicesModel')
const client=require('./clientModel')
const Supervisor = sequelize.define('Supervisor', {
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
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'supervisor',
  timestamps: false
});
const createsuper=(obj)=>{
  return Supervisor.create(obj)
}

const getsuper=(obj)=>{
  return Supervisor.findAll({where:{email:obj.email,password:obj.password}});
}
const service = async (id) => {
  const supervisors = await Supervisor.findAll({
    where: {
      id: id 
    },
    include: [
      { 
        model: team.Team,
        include: [
          {
            model: mission.Mission,
          }
        ]
      }
    ]
  });

  const missionIds = supervisors[0].Team.Missions[0].request_id


  const requests = await request.Request.findAll({
    attributes: ['pack_id'], 
    where: {
      id: missionIds
    }
  });

  const packIds = requests[0].pack_id
  result=await pack.Pack.findAll({where:{
    id:packIds
  },
  include: [{
    model: s.Service,
   
  }]
  
})
return result
};


const findOnesupervisor = (email) => {
  return  Supervisor.findOne({where:{email}})
}

const supervisormission = async (id) => {
  const supervisors = await Supervisor.findAll({
    where: {
      id: id 
    },
    include: [
      { 
        model: team.Team,
        include: [
          {
            model: mission.Mission
          }
        ]
      }
    ]
  })
  const missionIds = supervisors[0].Team.Missions[0].request_id


  const requests = await request.Request.findAll({
    attributes: ['pack_id'], 
    where: {
      id: missionIds
    }
  });
 

  return supervisors
}

const suppermission = async (id) => {
  const supp= await Supervisor.findAll({
    where: {
      id: id
    },
    include: [
      {
        model: team.Team,
        required: false,
        include: [
          {
            model: mission.Mission,
            required: false
          }
        ]
      }
    ]
  })

//   const missionIds = supp[0].Team.Missions[0].request_id


//   const requests = await request.Request.findAll({
//     // attributes: ['client_id'], 
//     where: {
//       id: missionIds
//     }
//   });

// const clients = await client.Client.findAll({
//   where: {
//     id: requests[0].client_id
//   }
// })

return supp
}

module.exports = {Supervisor,createsuper,getsuper,service,findOnesupervisor,supervisormission,suppermission};
