
var nodemailer = require('nodemailer');
const creds = require('../config/config');
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const userAuth = require('./userAuth');
require('dotenv').config()

// API Routes
router.use("/api", apiRoutes);
router.use('/userAuth', userAuth);

//mail
var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSW
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = ` name: ${name} \n email: ${email} \n message: ${message} `

  var mail = {
    from: name,
    to: 'keshnanrana@gmail.com',  //Change to email address that you want to receive messages on
    subject: 'New Message from '+ email +'.' ,
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;
