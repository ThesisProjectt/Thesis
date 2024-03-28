const nodemailer = require("nodemailer");

module.exports.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.email',
  port: 587,
  auth: {
      user: 'slah.eddine.ben.kacem@gmail.com',
      pass: 'eqzt mraf wfxm hkcc'
  }
});
