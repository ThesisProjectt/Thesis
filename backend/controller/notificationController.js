const db = require("../model/notificationModel");
const {io} = require('../middleware/Socket')

const create = async (req, res) => {
  try {
    const x = await db.createnot(req.body);
    res.status(201).json(x);
    io.on('connection', (socket) => {
      socket.emit('user','notif')
    })
  } catch (e) {
    res.status(500).send(e);
  }
};

const fetchNotification = async (req, res) => {
  const id = req.params.id;
  try {
    await db.getNotification(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(404).json({ message: "No Notification Found!" });
      });
  } catch (err) {
    console.log("error in fetching notification", err);
    res.status(400).json({ Error: "Internal Server Error!" });
  }
};

const removeNotifications = async (req, res) => {
    const id = req.params.id;
    try{
        let data = await db.clearAllNotifications(id)
        if(!data){ 
            res.status(400).json('Error while deleting notifications')
         }else{
             return res.status(200).json({message:"Deleted Successfully"})
         }  
    }catch(err){
       return res.status(500).json({ error : err})
}
}

module.exports = {
  create,
  fetchNotification,
  removeNotifications
};
