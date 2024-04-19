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


module.exports={
    createteam,getAllTeam
}