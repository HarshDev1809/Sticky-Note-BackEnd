const User = require("../Models/user.model");

const verifySignUp = async(req,res,next)=>{
    const {userName, name,emailId,password} = req.body;
    if(!userName){
        return res.status(400).send({message : "Username Can't be Empty"});
    }

    if(!name){
        return res.status(400).send({message : "Name Can't be Empty"});
    }

    if(!emailId){
        return res.status(400).send({message : "Email Id Can't be Empty"});
    }

    if(!password){
        return res.status(400).send({message : "Password Can't be Empty"});
    }
    try{
        const user = await User.find({
            $or: [
                {userName : userName},
                {emailId : emailId},
            ]
        });
        if(user.length){
            return res.status(400).send({message : "User Already Exist"});
        }else{
            next()
        }
    }catch(err){
        return res.send({message : "Something went wrong",err});
    }
}

const verifySignIn = async(req,res,next)=>{
    const {userName,password} = req.body;
    if(!userName){
        return res.status(400).send({message : "UserName empty"});
    }
    
    if(!password){
        return res.status(400).send({message : "Password empty"});
    }
    next();
}

module.exports = {
    verifySignUp,
    verifySignIn
}