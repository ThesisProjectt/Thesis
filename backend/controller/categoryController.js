const db = require('../model/categoriesModel') 
// const db = require ('../database/index') 

module.exports = {
    add : async (req,res) => {
       try{
        const added = await db.Category.create(req.body)
        res.json(added)
       }
       catch(error){console.log("error")}
      },
      
      getCatgories: async(req,res)=>{
        try {
            const gotten = await db.Category.findAll({})
            res.json(gotten)
        }
        catch(error){console.log("error")}
      },


      getCategory: async (req,res)=>{
        try {
            const gotten = await db.Category.findAll({where:{id:req.params.id}})
    res.json(gotten)
        }
        catch(error){console.log("error")}
      },
      
      updateCategory: async (req,res)=>{
        try {
            const updated = db.Category.update(req.body,{where:{id:req.params.id}})
      res.json(updated)
        }
        catch(error){console.log("error")}
},
    deleteCategory: async(req,res)=>{
        try {
            const deleted=await db.Category.destroy({where:{id:req.params.id}})
            res.json(deleted)
        }
        catch(error){console.log("error")}
    }
}

