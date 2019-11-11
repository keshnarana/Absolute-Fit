const express = require('express');
const cors = require('cors');
const users = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Users = require ('../models/Users')
users.use(cors())

process.env.SECRET_KEY ='secret'
// sign UP
users.post('/register' , (req,res) =>{
    const today = new Date()
    const usersDate = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
       email: req.body.email,
       password: req.body.password,
       created: today
    }
    Users.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                usersDate.password = hash
                Users.create(usersDate)
                .then(users => {
                    res.json({status: user.email + 'registered'})
                })
                .catch(err =>{
                    res.send('error:' +err)
                })
            })
        }else{
            res.json({error: 'Users already exists'})
        }
    })
    .catch(err =>{
        res.send('error:' + err)

    })
})
// login
users.post('/login',(req,res)=>{
   Users.findOne({
       email:req.body.email
   })
   .then(users =>{
if(users){
    if(bcrypt.compareSync(req.body.password, users.password)){
        const payload ={
            _id: user._id,
            first_name: users.first_name,
            last_name: users.last_name,
            email: users.email,
            
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY,{
           expiresIn:1440 
        })
        Response.send(token)
    } else{ 
        res.json({error: "User does not exist"})
    }
} else {
    res.json({error: "User does not exist"})
}
   })
   .catch(err => {
       res.send('error: ' +err)
   })
})
users.get('/profile',(req,res) =>{
    var decoded = jwt.verify(req.header['authorization'],process. env.SECRET_KEY)
})
module.exports = users