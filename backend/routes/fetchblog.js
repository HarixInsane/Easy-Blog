const express=require("express");
const Blog=require("../models/Blog");
const router=express.Router();

router.get("/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const blog=await Blog.findById(id);
    if(!blog){
      res.status(404).json("Blog not found");
    }
    res.json(blog);
  }
  catch(e){
    console.log("Failed to fetch blog");
    res.status(500).json("Failed to fetch blog");
  }
});

module.exports=router;