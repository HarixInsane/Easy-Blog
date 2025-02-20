const express=require("express");
const Blog=require("../models/Blog");
const router=express.Router();

router.post("/",async(req,res)=>{
  try{
    const {title,content,category,uname}=req.body;
    const blog=new Blog({title,content,category,uname});
    await blog.save();
    res.status(201).json({message:"Blog created successfully",blog});
  }catch(err){
    res.status(500).json({error:"Failed to create blog"});
  }
});

router.get("/:category",async(req,res)=>{
  try{
    const {category}=req.params;
    const blogs=category==="All"?await Blog.find().sort({createdAt:-1}):await Blog.find({category}).sort({createdAt:-1});
    res.json(blogs);
  }catch(err){
    res.status(500).json({error:"Failed to fetch blogs"});
  }
});

router.post("/like/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const {name}=req.body;
    const blog=await Blog.findById(id);
    if(!blog){
      return res.status(404).json({error:"Blog not found"});
    }
    if(blog.userlikes.includes(name)){
      blog.userlikes=blog.userlikes.filter(n=>n!==name);
      blog.likes-=1;
    }
    else{
      blog.userlikes.push(name);
      blog.likes+=1;
    }
    await blog.save();
    return res.status(200).json({likes:blog.likes,userlikes:blog.userlikes});
  }
  catch(e){
    res.status(500).json("Failed to Like");
  } 
});

router.post("/comment/create/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const {name,comment}=req.body;
    const blog=await Blog.findById(id);
    if(!blog){
      return res.status(404).json({error:"Blog not found"});
    }
    blog.comments.push({name,comment});
    await blog.save();
    res.status(200).json(blog.comments);
  }
  catch(e){
    res.status(500).json({error:"Failed to add comment"});
  }
});

router.delete("/comment/delete/:blogId/:commentId",async(req,res)=>{
  const {blogId,commentId}=req.params;
  const {name}=req.body;
  try{
    const blog=await Blog.findById(blogId);
    if(!blog) 
      return res.status(404).json({error:'Blog not found'});

    const comment=blog.comments.id(commentId);
    if(!comment){
      return res.status(404).json({error:'Comment not found'});
    }
    if(comment.name!==name && blog.uname!==name && name!=='harixadmin'){
      return res.status(403).json({error:'Unauthorized'});
    }
    blog.comments.pull(commentId);
    await blog.save();

    res.json({comments:blog.comments});
  }
  catch(e){
    res.status(500).json({error:'Failed to delete comment'});
  }
});

router.delete("/delete/:id",async(req,res)=>{
  const {id}=req.params;
  const {name}=req.body;
  try{
    const blog=await Blog.findById(id);
    if(!blog){
      return res.status(404).json({error:'Blog not found'});
    }

    if(blog.uname!==name && name!=='harixadmin'){
      return res.status(403).json({error:'Unauthorized'});
    }

    await blog.deleteOne();
    res.json({message:'Blog deleted successfully'});
  }
  catch(e){
    res.status(500).json({error:'Failed to delete blog'});
  }
});



module.exports=router;
