// const { verify } = require('jsonwebtoken')
const db = require ('../model/paymentModel')
const axios = require('axios')
require("dotenv").config()




module.exports = {
    Add :
    async (req,res)=> {
 
        const url = "https://developers.flouci.com/api/generate_payment"
        const payload = 
        {   "app_token": process.env.FLOUCI_PUBLIC_KEY,   
            "app_secret": process.env.FLOUCI_SECRECT_KEY,
            "amount": req.body.amount,
            "accept_card": "true",
            "session_timeout_secs": 1200,
            "developer_tracking_id": process.env.FLOUCI_ID,
            "success_link":"https://assets-global.website-files.com/629f4f1071598e2325b33b7f/64c26c1fae8773a006e188ff_Group%20231%20(1).png",
            "fail_link":"http://localhost:3000"
        }
        console.log(payload,"payload");
        await axios.post(url,payload)
        .then((result)=>{
            res.send({result:result.data,payload:payload})})
        .catch((e)=>  {console.log(e)})
        
    },
    Verify : async  (req,res) => {
    
        const payment_id= req.params.id
      await axios.get(`https://developers.flouci.com/api/verify_payment/${payment_id}`, {
        headers : {
            "Content-Type":"application/json",
            'apppublic': process.env.FLOUCI_PUBLIC_KEY, 
            'appsecret': process.env.FLOUCI_SECRECT_KEY
          
        }
      }
      )
      .then((result)=>{
        res.send(result.data)})
        .catch(e=>console.log(e))
    },

  Success: (req,res) =>{
    // const payment_id= req.params.id
    // axios.get(`http://localhost:3000/success`)
    // .then(res =>res.send("success") )
    // .catch(err => console.log(err))
    res.send("hello")
  },

  Fail: (req,res)=> {
    
    // axios.get(`http://localhost:3000`)
    // .then(res=>res.send("fail"))
    // .catch(err => console.log(err))
    res.send("fail")
  }
  
   
    
    
    
}
