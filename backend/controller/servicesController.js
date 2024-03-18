const db = require('../model/servicesModel') 
// const db = require ('../database/index') 
// const {PackHasServices} = require('../model/packHasServicesModel')
module.exports = {
    add : async (req,res) => {
       try{
        const added = await db.Service.create(req.body)
        res.json(added)
       }
       catch(error){console.log("error")}
      },
      
      getServices: async(req,res)=>{
        try {
            const gotten = await db.Service.findAll({})
            res.json(gotten)
        }
        catch(error){console.log("error")}
      },


      getService: async (req,res)=>{
        try {
            const gotten = await db.Service.findAll({where:{id:req.params.id}})
    res.json(gotten)
        }
        catch(error){console.log("error")}
      },

      getServicebyCategory: async (req,res)=>{
        try {
          const gotten = await db.Service.findAll({where:{category_id:req.body.category_id}})
          res.json(gotten)
        }
        catch(error){console.log("error")}
      },
      
      updateService: async (req,res)=>{
        
        try {
            const updated = db.Service.update(req.body,{where:{id:req.params.id}})
      res.json(updated)
        }
        catch(error){console.log("error")}
},
    deleteService: async(req,res)=>{
        try {
            const deleted=await db.Service.destroy({where:{id:req.params.id}})
            res.json(deleted)
        }
        catch(error){console.log("error")}
    },
    find: async(req,res)=>{
      try{
        const found = await db.Service.findAll({ where: {
          category_id: req.params.id
        },include: {
          model: PackHasServices,
         
      },
          
          
      })
         res.json(found)
      }
      catch(error){console.log(error)}
    },
}

