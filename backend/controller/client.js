const db = require("../model/clientModel");
// const db = require ('../database/index')

module.exports = {
  add: async (req, res) => {
    try {
      const added = await db.Client.create(req.body);
      res.json(added);
    } catch (error) {
      console.log("error");
    }
  },

  getClients: async (req, res) => {
    try {
      const gotten = await db.Client.findAll({});
      res.json(gotten);
    } catch (error) {
      console.log("error");
    }
  },

  getClient: async (req, res) => {
    try {
      const gotten = await db.Client.findAll({ where: { id: req.params.id } });
      res.json(gotten);
    } catch (error) {
      console.log("error");
    }
  },

  updateClient: async (req, res) => {
    try {
      const updated = db.Client.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(updated);
    } catch (error) {
      console.log("error");
    }
  },
  deleteClient: async (req, res) => {
    try {
      const deleted = await db.Client.destroy({ where: { id: req.params.id } });
      res.json(deleted);
    } catch (error) {
      console.log("error");
    }
  },
};
