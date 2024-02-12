const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
const { SECRET } = require("../../configs/auth.config");

const verifyToken = async(req,res,next)=>{
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(400).send({message : "Token not proviede"});
    }else{
        jwt.verify(token,SECRET,async(err,payload)=>{
            if(err){
                return res.status(400).send({message : "User not Authenticated"});
            }else{
                const userName = payload.userName;
                try{
                    const user = await User.findOne({userName : payload.userName})
                    req.user = user;
                    next();
                }catch(err){
                    return res.status(500).send({message : "Something went wrong!"});
                }
            }
        });
    }
}

module.exports = {
    verifyToken
}