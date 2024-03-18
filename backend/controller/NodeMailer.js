const nodemailer = require("nodemailer");

module.exports.transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'terrell.hermann94@ethereal.email',
      pass: 'FXkUyehHjcYUZecgQh'
  }
});
