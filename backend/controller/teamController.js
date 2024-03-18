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
module.exports={
    createteam
}