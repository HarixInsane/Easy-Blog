import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Promotion({searchQuery}){
  const [blogs,setBlogs]=useState([]);

  useEffect(()=>{
    const fetchBlogs=async()=>{
      try{
        const res=await axios.get("http://localhost:8000/api/blog/Promotional");
        setBlogs(res.data);
      }catch(err){
        console.error("Error fetching blogs:",err);
      }
    };
    fetchBlogs();
  },[]);

  const filteredBlogs=blogs.filter((blog)=>{
    return (
      blog.title.toLowerCase().includes((searchQuery || "").toLowerCase()) ||
      blog.uname.toLowerCase().includes((searchQuery || "").toLowerCase())
    );
  });

  return(
    <div className="blog-list">
      {filteredBlogs.map((blog)=>(
        <div key={blog._id} className="blog-container">
          <Link to={`/blog/${blog._id}`}>
            <h3>{blog.title}</h3>
            <p>By:{blog.uname}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Promotion;
