const express=require("express");
const router=express.Router();
const User=require("../models/User");
const sendToken=require("../utils/jwt");

router.post("/loginuser",async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const user=await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({message:"User doesn't exist... Register first"});
        }
        if(!await user.isValidPassword(password)){
            return res.status(401).json({message:"Password doesn't match.. Enter correct Password"});
        }

        sendToken(user,201,res);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

module.exports=router;