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



module.exports={
    create,
    getAll
}