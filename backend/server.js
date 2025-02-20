const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const path=require("path");

//route imports
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const imgUpload=require("./routes/uploads");
const createBlog=require("./routes/blogs");
const fetchBlog=require("./routes/fetchblog");

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET','POST','DELETE','OPTIONS'],
    credentials:true
}));

mongoose.connect("mongodb://localhost:27017/blog").
then( () =>{
    console.log("MongoDB connected");
})
.catch((e)=>{
    console.log(e);
})

//user routes
app.use('/api/users/',userRoute);
app.use('/api/auth/',authRoute);
app.use('/api/blog/',createBlog);
app.use('/api/upload',imgUpload);
app.use('/api/fetch',fetchBlog);

app.use("/backend/uploads",express.static(path.join(__dirname, "./uploads")));

const PORT=8000;
app.listen(PORT,()=>{
    console.log(`Server is listening on the port ${PORT}`);
})