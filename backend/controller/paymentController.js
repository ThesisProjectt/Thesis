// const { verify } = require('jsonwebtoken')
const db = require("../model/paymentModel");

const axios = require("axios");
require("dotenv").config();

module.exports = {
  Add: async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment";
    const payload = {
      app_token: process.env.FLOUCI_PUBLIC_KEY,
      app_secret: process.env.FLOUCI_SECRECT_KEY,
      amount: req.body.amount,
      accept_card: "true",
      session_timeout_secs: 1200,
      developer_tracking_id: process.env.FLOUCI_ID,
      success_link: "http://192.168.1.45:3000/api/success",
      fail_link: "http://192.168.1.45:3000/api/fail",
    };
    await axios
      .post(url, payload)
      .then((result) => {
        res.send({ result: result.data, payload: payload });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  Verify: async (req, res) => {
    const payment_id = req.params.id;
    await axios
      .get(`https://developers.flouci.com/api/verify_payment/${payment_id}`, {
        headers: {
          "Content-Type": "application/json",
          apppublic: process.env.FLOUCI_PUBLIC_KEY,
          appsecret: process.env.FLOUCI_SECRECT_KEY,
        },
      })
      .then((result) => {
        res.send(result.data);
      })
      .catch((e) => console.log(e));
  },

  Success: (req, res) => {
    // res.send("hello")
    // res.sendFile(path.join(__dirname, '/index.html'));
    res.send(`

    <html >
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" />   
    </head>
    <body bgcolor="#d7d7d7" class="generic-template" style="-moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased; background-color: #d7d7d7; margin: 0; padding: 0;">
       <style> 
        ._failed{ border-bottom: solid 4px red !important; }
        ._failed i{  color:red !important;  }

        ._success {
        box-shadow: 0 15px 25px #00000019;
        padding: 45px;
        width: 100%;
        text-align: center;
        margin: 40px auto;
        border-bottom: solid 4px #28a745;
}

    ._success i {
        font-size: 55px;
        color: #28a745;
    }

    ._success h2 {
        margin-bottom: 12px;
        font-size: 40px;
        font-weight: 500;
        line-height: 1.2;
        margin-top: 10px;
    }

    ._success p {
        margin-bottom: 0px;
        font-size: 18px;
        color: #495057;
        font-weight: 500;
    }
       
       </style>

    <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="message-box _success">
                 <i class="fa fa-check-circle" aria-hidden="true"></i>
                <h2> Your payment was successful </h2>
               <p> Thank you for your payment. we will <br>
be in contact with more details shortly </p>      
        </div> 
    </div> 
</div> 
<hr>




</div> 
    </body> </html>
`);
  },

  Fail: (req, res) => {
    res.send(`<div class="row justify-content-center">
    <div class="col-md-5">
        <div class="message-box _success _failed">
             <i class="fa fa-times-circle" aria-hidden="true"></i>
            <h2> Your payment failed </h2>
     <p>  Try again later </p> 
 
    </div> 
</div> 
</div> `);
  },
};
