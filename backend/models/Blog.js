const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,required:true},
    uname:{type:String,required:true},
    likes:{type:Number,default:0},
    userlikes:{type:[String],default:[]},
    comments:[
        {
          name:String,
          comment:String,
          createdAt:{type:Date,default:Date.now},
        },
    ],
    createdAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model("Blog",blogSchema);
