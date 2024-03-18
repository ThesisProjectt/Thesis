const db=require('../model/ratingsModel')
const getrating=async(req,res)=>{
    try{
        const x =await db.getr
        res.status(201).json(x)
    }catch(e){
        res.status(500).send(e)
    }
}
module.exports={
    getrating,
}