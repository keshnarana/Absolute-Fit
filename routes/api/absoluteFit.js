const router = require('express').Router();
const db = require('../../controllers');
const passport = require('passport');
require('../../config/passport')(passport);

router.post('/newUser', passport.authenticate('jwt',{session: false}),(req,res) => {
const token = getToken(req.headers);
if(token){
    console.log('user is logged in to the post route newUser');
    db.User.createUser(req,res);
} 
else{
    return res.status(403).send({ success: false, msg:'Unauthorized'});

}  
}
);