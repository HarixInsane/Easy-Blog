import {useEffect,useRef,useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBlog(){
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [category,setCategory]=useState("Educational");
  const [msg,setmsg]=useState("");
  const quillRef=useRef(null);
  const nav=useNavigate();

  useEffect(()=>{
    const quill=new Quill(quillRef.current,{
      theme:"snow",
      modules:{
        toolbar:{
          container:[
            ["bold","italic","underline","strike"],
            [{header:[1,2,3,false]}],
            [{list:"ordered"},{list:"bullet"}],
            ["link","image"],
            [{align:[]}]
          ],
          handlers:{
            image:()=>{
              const input=document.createElement("input");
              input.setAttribute("type","file");
              input.setAttribute("accept","image/*");
              input.onchange=async()=>{
                const file=input.files[0];
                if(file){
                  const imageUrl=await handleImageUpload(file);
                  const range=quill.getSelection();
                  quill.insertEmbed(range.index,"image",imageUrl);
                }
              };
              input.click();
            }
          }
        }
      }
    });

    quill.on("text-change",()=>{
      setContent(quill.root.innerHTML);
      autoResize();
    });

    const autoResize=()=>{
      const editor=quillRef.current;
      editor.style.height='auto';
      editor.style.height=`${editor.scrollHeight}px`;
    };

    autoResize();

  },[]);

  const handleImageUpload=async(file)=>{
    try{
      const formData=new FormData();
      formData.append("image",file);
      const res=await axios.post("http://localhost:8000/api/upload/create",formData,{headers:{"Content-Type":"multipart/form-data"}});
      return res.data.imageUrl;
    }catch(err){
      console.error("Image upload failed",err);
      alert("Failed to upload image");
    }
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const uname=localStorage.getItem("username");
      const data={title,content,category,uname};
      await axios.post("http://localhost:8000/api/blog",data);
      setmsg("Blog created successfully...");
      setTimeout(()=>{
        nav("/");
      },2000);
    }catch(err){
      console.error("Error creating blog",err);
      setmsg("Blog created successfully...");
    }
  };

  return(
    <div className="create-blog-container">
      <div class="create">
      <h1 className="page-title">Create a New Blog</h1>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Blog Title</label>
          <input type="text" id="title" placeholder="Enter blog title" value={title} onChange={(e)=>setTitle(e.target.value)} required className="form-input"/>
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <select id="category" value={category} onChange={(e)=>setCategory(e.target.value)} className="form-select">
            <option value="Educational">Educational</option>
            <option value="Promotional">Promotional</option>
            <option value="Motivational">Motivational</option>
            <option value="Gaming">Gaming</option>
            <option value="News">News</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">Content</label>
          <div ref={quillRef} className="quill-editor"/>
        </div>

        <button type="submit" className="submit-btn">Post Blog</button>
        {msg && <p>{msg}</p>}
      </form>
      </div>
    </div>
  );
}
