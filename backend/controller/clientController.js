const db = require("../model/clientModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = process.env.JWT_SECRET;

const getClient = async (req, res) => {
  try {
    const x = await db.getClient();
    res.status(201).json(x);
  } catch (err) {
    console.log("Error in getting client", err);
    res.status(500).send(err)
  }
};

const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const values = {
      fullName: fullName,
      email: email,
      password: hashed,
    };

    const results = await db.findOneClient(email);
    if (results !== null) {
      res.status(409).send("User with the same email already exists");
    } else {
      await db.addClient(values);
      res.status(200).json("created");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const results = await db.findOneClient(email);
    if (!results) {
      return res.status(401).json("Invalid Email");
    }
    
    const validPassword = await bcrypt.compare(password, results.password);
    if (!validPassword) {
      return res.status(401).json("Invalid Password!");
    }
    const token = jwt.sign({ userId: results.id, name: results.fullName }, secretKey, { expiresIn: "3h" });
    delete results.password;
    res.status(200).header("token", `${token}`).json({
        message: `Welcome ${results.fullName}`,
        id: results.id
      })
      
  } catch (err) {
    console.log("Error in Login", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  const {email, password} = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try{
    await db.changePass(email, hashed);
    res.status(200).json('Successfully changed your password');
  }
  catch(err){
    res.status(500).json(err)
  };
};

const getImgClient = async (req, res) => {
  const id = req.params.id
  try{
    await db.findImgClient(id)
      .then((data)=>{
        res.status(200).json(data.image)
      })
      .catch((err) => 
      res.status(500).json(err)
      )
  }
  catch(err){
    res.status(500).json(err)
  }
}

const findOneClient = async (req, res) => {
  const id = req.params.id
  try{
    await db.getOneClient(id)
    .then((result)=>{
      res.status(200).json(result)
    })
  }
  catch(err){ 
    res.status(500).json(err)
  }
}

const updateClient = (req, res) => {
  const id = req.params.id
  const data = req.body
  try{
    db.update(id, data)
    res.status(201).json("Successfully updated client")
  }
  catch(err){
    res.status(500).json(err)
  }
}

const updateuser = async (req, res) => {
  try {
    await db.Client.update(req.body, {
      where: { id: req.params.id },
    }).then((data)=>{
      res.status(203).json(data);
    })
      
  } catch (error) {
    res.status(500).send(error);
  }
}

const getoneclient = async (req, res) => {
  try {
    const gotten = await db.Client.findAll({ where: { id: req.params.id } });
    res.json(gotten);
  } catch (error) {
    console.log("error");
  }
}

module.exports = {
  getClient,
  signUp,
  login,
  changePassword,
  getImgClient,
  findOneClient,
  updateClient,
  getoneclient,
  updateuser
};
