const express=require("express");
const mongoose=require("mongoose");
const User=require("../models/User");

const router=express.Router();

//push user data to db
router.post('/createuser',async(req,res)=>{
    try{
        const user=new User({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        });

        const existingemail=await User.findOne({
            email:req.body.email
        });

        const existingname=await User.findOne({
            username:req.body.username
        });

        if(existingemail)
        {
            return res.status(400).json({message:"Account already exist... Try to Sign In"});
        }
        if(existingname)
            return res.status(400).json({message:"Username already exist... Try with new one"});

        await user.save();
        res.status(200).json({message:"Registered Successfully"});
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
})

module.exports=router;