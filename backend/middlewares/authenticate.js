const catchAsyncError=require("./catchAsyncError");
const jwt=require("jsonwebtoken");
const User=require("../models/User");

exports.isAuthenticatedUser=catchAsyncError(async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token)
    {
        return res.status(401).json({message:"Login to handle the resource"});
    }
    const decoded=jwt.verify(token,"123456");
    req.user=await User.findById(decoded.id);
    next();
});