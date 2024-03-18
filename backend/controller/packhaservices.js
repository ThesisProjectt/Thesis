const db = require('../model/packHasServicesModel') 
// const db = require ('../database/index') 
const {Service} = require('../model/servicesModel')
module.exports = {
    add : async (req,res) => {
       try{
        const added = await db.PackHasServices.create(req.body)
        res.json(added)
       }
       catch(error){console.log("error")}
      },
      
      getAllPacks: async(req,res)=>{
        try {
            const gotten = await db.PackHasServices.findAll({})
            res.json(gotten)
        }
        catch(error){console.log("error")}
      },


      getOnePack: async (req,res)=>{
        try {
            const gotten = await db.PackHasServices.findAll({where:{id:req.params.id}})
    res.json(gotten)
        }
        catch(error){console.log("error")}
      },

    //   getThisPack: async (req,res)=>{
    //     try {
    //       const gotten = await db.PackHasServices.findAll({where:{category_id:req.body.category_id}})
    //       res.json(gotten)
    //     }
    //     catch(error){console.log("error")}
    //   },
      
      updateThisPack: async (req,res)=>{
        
        try {
            const updated = db.PackHasServices.update(req.body,{where:{id:req.params.id}})
      res.json(updated)
        }
        catch(error){console.log("error")}
},
    deleteThisPack: async(req,res)=>{
        try {
            const deleted=await db.PackHasServices.destroy({where:{pack_id:req.params.id}})
            res.json(deleted)
        }
        catch(error){console.log("error")}
    },

    deleteFromPack: async (req,res)=>{
      try {
        const deleted = await db.PackHasServices.destroy({where:{pack_id:req.body.pack_id,service_id:req.body.service_id}})
      res.json(deleted)
      }
      catch(error){console.log(error)}
    },
    updateService: async(req,res)=>{
      // const quantity = req.body.quantity
      try{
        const updated = await  db.PackHasServices.update({quantity:req.body.quantity},{where:{pack_id:req.body.pack_id,service_id:req.body.service_id}})
        res.json(updated)
      }
      catch(error){console.log(error)}
    },

   
}

