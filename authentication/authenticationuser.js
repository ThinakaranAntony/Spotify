const jwt = require('jsonwebtoken');
const users = require("../models/usermodel")
require('dotenv').config();
const authenticateToken = (req,res,next) => {
    
    const token = req.headers['authorization'];
    if(!token) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN,async(err,user) => {
        if(err){
            return res.sendStatus(403);
        }
        console.log(user.username)
const userdb = await users.findOne({
    where : {username:user.username} 
})
if(userdb == null){
    res.send("Not an User")
}
       else{
        next();
       } 
    })
}

module.exports ={authenticateToken} 