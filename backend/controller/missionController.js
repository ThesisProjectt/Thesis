const db=require('../model/missionModel')
const {Request}=require('../model/requestModel')
const {Client}=require('../model/clientModel')
const getAll = async (req, res) => {
    try{
        const x = await db.getAllMission();
        res.status(200).json(x)
    }catch(e){
        res.status(500).send(e)
    }
}

const find= async(req,res)=>{
    try {
      const found = await db.Mission.findAll({where:{id:req.params.id}})
      const x= await Request.findAll({where:{id:found[0].request_id}})
      const ss=await Client.findAll({where:{id:x[0].client_id}})
      res.json(ss)
    }
    catch(error){console.log(error)}
  }
const update=async(req,res)=>{
 
  try {
    const up = await db.updateMission(req.body,req.params.id)
    
    res.json(up)
  }
  catch(error){console.log(error)}
}

module.exports={
    getAll,find,update
}