const db=require('../model/missionModel')
const {Request}=require('../model/requestModel')

const getAll = async (req, res) => {
    try{
        const x = await db.getMission();
        res.status(200).json(x)
    }catch(e){
        res.status(500).send(e)
    }
}

const find= async(req,res)=>{
    try {
      const found = await db.Mission.findAll({
        include: [{
          model: Request,
          where:{pack_id:req.params.id},
          // through:{attributes:[]},
        }]
      })
      res.json(found)
    }
    catch(error){console.log(error)}
  }


const cr= async(req,res)=>{
    try{
        const x=db.create(req.body);
        res.status(201).json(x)
    }catch(e){
        res.send(e)
    }
}
module.exports = {
    cr,getAll,find

  };