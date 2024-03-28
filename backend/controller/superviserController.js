const db=require('../model/supervisorModel')
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = process.env.JWT_SECRET;

const create =async(req,res)=>{
    try{
        let supervisor = await db.createsuper(req.body)
        res.status(201).json(supervisor)
        }catch (e){     
            res.status(500).send(e)
        }
}


const getsuper=async(req,res)=>{
    try{
        const x=await db.getsuper();
        res.status(201).json(x);
    }catch(err){
        console.log("Error in getting admin", err);
        res.status(500).send(err)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const results = await db.findOneadmin(email);
      if (!results) {
        return res.status(401).json("Invalid Email");
      }


      if (results.password!==password) {
        return res.status(401).json("Invalid Password!");
      }
      const token = jwt.sign({ userId: results.id, fullName: results.fullName }, secretKey, { expiresIn: "12h" });
      delete results.password;
      res.status(200).header("token",` ${token}`).json({
          message: `Welcome ${results.fullName}`,
          id: results.id
        })

    } catch (err) {
      console.log("Error in Login", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

module.exports={
    create,login,getsuper
}