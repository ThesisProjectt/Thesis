const db = require('../model/packModel') 
// const db = require ('../database/index') 
const {PackHasServices} = require('../model/packHasServicesModel')
const {Service}=require('../model/servicesModel')
module.exports = {
    add : async (req,res) => {
       try{
        const added = await db.Pack.create(req.body)
        res.json(added)
       }
       catch(error){console.log("error")}
      },
      
      getPack: async(req,res)=>{
        try {
            const gotten = await db.Pack.findAll({})
            res.json(gotten)
        }
        catch(error){console.log("error")}
      },


      getPacks: async (req,res)=>{
        try {
            const gotten = await db.Pack.findAll({})
    res.json(gotten)
        }
        catch(error){console.log("error")}
      },
      
      updatePack: async (req,res)=>{
        
        try {
            const updated = db.Pack.update(req.body,{where:{id:req.params.id}})
      res.json(updated)
        }
        catch(error){console.log("error")}
},
    deletePack: async(req,res)=>{
        try {
            const deleted=await db.Pack.destroy({where:{id:req.params.id}})
            res.json(deleted)
        }
        catch(error){console.log("error")}
    },

    deletePackk :async (req,res)=>{
      try {
        const deleted = db.Pack.destroy({where:{name:req.params.name}})
        res.json(deleted)
      }
      catch(error){res.json(error)}
    },
    find: async(req,res)=>{
      try {
        const found = await db.Pack.findAll({
          include: [{
            model: Service,
            where:{category_id:req.params.id},
            // through:{attributes:[]},
          }]
        })
        res.json(found)
      }
      catch(error){console.log(error)}
    },
    fetchPack: async (req, res) => {
      const id = req.params.id
      try{
        const pack = await db.getPack(id)
        res.status(200).json(pack)
      }
      catch(err){
        res.status(400).json(err)
      }
    }
}

