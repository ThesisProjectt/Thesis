const db=require('../model/requestModel')
const create=async(req,res)=>{
    try{
       db.createreq(req.body).then((data)=>{
            res.status(201).json(data.dataValues)
        })
        
    }
catch(e){
    res.status(500).send(e)
}
}
const getAll = async (req, res) => {
    try{
        const x = await db.getrequest();
        res.status(200).json(x)
    }catch(e){
        res.status(500).send(e)
    }
}
const getonlyrequest=async(req,res)=>{
    try{
        const x=await db.getonlyrequest();
        res.status(200).json(x)
    }catch(e){
        res.status(500).send(e)
    }
}
const deleted =async(req,res)=>{
    try{
        let id= req.params.id;
   const x=db.deleted(id)
res.status(203).json(x)
    }catch(err){
        log(err)
    }
   }



module.exports={
    create,
    getAll,
    getonlyrequest,
    deleted
}