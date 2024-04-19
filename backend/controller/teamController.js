const db=require('../model/teamModel')
const createteam=async(req,res)=>{
    try{
        console.log(req.body);
        const x=await db.create(req.body);
        res.status(202).json(x);
    }catch(err){
        console.log("Error in getting Employee", err);
        res.status(500).send(err)
    }
}


const getAllTeam = async (req, res) => {
    const idTeam=req.params.id
    try{
        const x = await db.findTeam(idTeam);
        res.status(200).json(x)
    }catch(e){
        res.status(500).send(e)
    }
}
const find = async (req,res)=>{
    try{
        const x=await db.findTeam()
        res.json(x)
    }
    catch(err){
        console.log(err,"team err")
    }
}

const teamwithoutmission=async(req,res)=>{
  try{
    const d=req.body.date
    var result = await db.teamwithoutmission(d)
    res.status(201).json(result)
  }catch(err){
    res.send(err)
  }

}
const getteam=async(req,res)=>{
    try{
        const result= await db.getteam()
        res.status(201).json(result)
    }catch(err){
        res.send(err)
      }
    
}
module.exports={
    createteam,find,
    teamwithoutmission,
    getteam,getAllTeam
}

