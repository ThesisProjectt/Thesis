const db=require('../model/notificationModel')
const create=async(req,res)=>{
    try{
        const x =await db.createnot(req.body); 
        res.status(201).json(x)
    }catch(e){
        res.status(500).send(e)
    }
}
module.exports={
    create,
}