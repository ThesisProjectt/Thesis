const db=require('../model/adminModel')
const getadmin=async(req,res)=>{
    try{
        const x=await db.getadmin(req.body);
        res.status(201).json(x);
    }catch(err){
        console.log("Error in getting admin", err);
        res.status(500).send(err)
    }
}
module.exports={
    getadmin
}