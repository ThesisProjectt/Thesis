const db=require('../model/employeeModel')
const getEmployee=async(req,res)=>{
    try{
        const x=await db.getEmployee();
        res.status(201).json(x);
    }catch(err){
        console.log("Error in getting Employee", err);
        res.status(500).send(err)
    }
}
const postEmployee=async(req,res)=>{
    try{
        const x=await db.createEmployee(req.body)
        res.status(202).json(x)
    }catch(err){
        console.log("Error in creating Employee", err);
        res.status(500).send(err)
    }
}
const updateEmployeeteam=async(req,res)=>{
try{
    const x=await db.updateEmpoyeeteam(req.body,req.params.id)
    res.status(204).json(x)
}catch(err){
    console.log("Error in updating Employee team", err);
    res.status(500).send(err)
}
}


const getbyTeamId = async (req,res)=>{
    try {
        const x = await db.getEmployee({where:{team_id:req.params.id}})
    res.json(x)
    }
catch(err){
    console.log(err,"employee ,err")
}
}
module.exports={
    getEmployee,
    postEmployee,
    updateEmployeeteam,
    getbyTeamId
}