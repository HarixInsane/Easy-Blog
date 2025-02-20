const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
});

userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.getJwtToken=function(){
    return jwt.sign(
        {id: this._id},
        "123456",
    );
};

userSchema.methods.isValidPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
module.exports=mongoose.model("User",userSchema);

