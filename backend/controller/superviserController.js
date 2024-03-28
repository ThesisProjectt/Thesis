const db=require('../model/supervisorModel')
const create =async(req,res)=>{
    try{
        let supervisor = await db.createsuper(req.body)
        res.status(201).json(supervisor)
        }catch (e){     
            res.status(500).send(e)
        }
}
const find =async(req,res)=>{
    try{
        let supervisor = await db.findSuper()
        res.json(supervisor)
        }catch (e){     
            res.status(500).send(e)
        }
}


module.exports={
    create,find
}