const db=require('../model/ratingsModel')

const getrating = async (req,res) => {
    try{
        const x = await db.getr
        res.status(201).json(x)
    }catch(e){
        res.status(500).send(e)
    }
}

const giveRate = (req, res) => {
    let data = req.body;
    db.addRate(data)
    .then((result)=>{
        res.status(201).json(result)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
}

module.exports={
    getrating,
    giveRate
}