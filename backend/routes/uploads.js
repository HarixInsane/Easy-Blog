const express=require("express");
const multer=require("multer");
const fs=require("fs");
const path=require("path");
const router=express.Router();

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    const uploadPath=path.join(__dirname,"../uploads");
    if(!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null,uploadPath);
  },
  filename:(req,file,cb)=>{
    cb(null,`${Date.now()}-${file.originalname}`);
  },
});

const upload=multer({storage});

router.post("/create",upload.single("image"),(req,res)=>{
  try{
    const imageUrl=`http://localhost:8000/backend/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl});
  }catch(err){
    res.status(500).json({error:"Image upload failed"});
  }
});

router.delete("/delete",async(req,res)=>{
  try{
    const{imageUrl}=req.body;
    const filePath=path.join(__dirname,"../uploads",path.basename(imageUrl));
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
      res.status(200).json({message:"Image deleted successfully"});
    }else{
      res.status(404).json({error:"Image not found"});
    }
  }catch(err){
    res.status(500).json({error:"Failed to delete image"});
  }
});

module.exports=router;
