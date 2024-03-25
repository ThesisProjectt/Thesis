const db=require('../model/adminModel')
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = process.env.JWT_SECRET;
const getadmin=async(req,res)=>{
    try{
        const x=await db.getadmin();
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
      const token = jwt.sign({ userId: results.id, name: results.name }, secretKey, { expiresIn: "12h" });
      delete results.password;
      res.status(200).header("token", `${token}`).json({
          message: `Welcome ${results.name}`,
          id: results.id
        })
        
    } catch (err) {
      console.log("Error in Login", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
module.exports={
    getadmin,
    login
}