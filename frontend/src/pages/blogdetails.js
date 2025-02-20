import {useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import {Trash2} from "lucide-react";
import axios from "axios";

function BlogDetails() {
  const {id}=useParams();
  const [blog,setBlog]=useState(null);
  const [likes,setLikes]=useState(0);
  const [userLikes,setUserLikes]=useState([]);
  const [likee,setLikee]=useState("");
  const [comments,setComments]=useState([]);
  const [newComment,setNewComment]=useState("");
  const [commente,setCommente]=useState("");
  const [admin,setAdmin]=useState(false);
  const [showConfirm,setShowConfirm]=useState({show:false,type:"",cid:null});
  const name=localStorage.getItem("username");
  const bcrypt=require("bcryptjs");
  const nav=useNavigate();

  useEffect(()=>{
    const fetchBlog=async()=>{
      try{
        const res=await axios.get(`http://localhost:8000/api/fetch/${id}`);
        setBlog(res.data);
        setLikes(res.data.likes);
        setUserLikes(res.data.userlikes || []);
        setComments(res.data.comments);
        if(bcrypt.compareSync(name,"$2a$10$tO0nC6dGon.4CXUJU0h7quLvESATAFGnyKDBIzUJG8DfUUGXeVpx6")){
          setAdmin(true);
        }
      }catch(err){
        console.error("Error fetching blog:",err);
      }
    };
    fetchBlog();
  },[id]);

  if(!blog){
    return <div className="loading">Loading...</div>;
  }

  const handleLike=async()=>{
    try{
      if(name){
        const res=await axios.post(`http://localhost:8000/api/blog/like/${id}`,{name});
        setLikes(res.data.likes);
        setUserLikes(res.data.userlikes);
      }else{
        nav("/auth/signin");
      }
    }catch(e){
      setLikee(e);
    }
  };

  const handleComment=async()=>{
    if(!name){
      nav("/auth/signin");
      return;
    }
    if(!newComment.trim()){
      setCommente("Comment cannot be empty");
      return;
    }
    try{
      setCommente("");
      const res=await axios.post(`http://localhost:8000/api/blog/comment/create/${id}`,{name,comment:newComment});
      setComments(res.data);
      setNewComment("");
    }catch(e){
      setCommente("Something went wrong...")
    }
  };

  const confirmDelete=(type,cid)=>{
    setShowConfirm({show:true,type,cid});
  };

  const handleDelete=async()=>{
    const {type,cid}=showConfirm;
    try{
      if(type==="comment"){
        await axios.delete(`http://localhost:8000/api/blog/comment/delete/${id}/${cid}`,{data:{name}});
        setComments(comments.filter(comment=>comment._id!==cid));
      }else if(type==="blog"){
        await axios.delete(`http://localhost:8000/api/blog/delete/${cid}`,{data:{name}});
        nav("/");
      }
    }catch(err){
      console.error(`Failed to delete ${type}:`,err);
    }finally{
      setShowConfirm({show:false,type:"",cid:null});
    }
  };

  const cancelDelete=()=>{
    setShowConfirm({show:false,type:"",cid:null});
  };

  const isLiked=userLikes.includes(name);

  return(
    <div class="entire">
    <div className="blog-details">
      <div className="blog-header">
        <h1>{blog.title}</h1>
        <p className="blog-author">By: {blog.uname}</p>
      </div>
      {(admin || name===blog.uname)&& (
        <button onClick={()=>confirmDelete("blog",id)} className="delete-blog-btn"><Trash2 size={20} /></button>
      )}
      <p className="blog-category">Category: {blog.category}</p>

      <div className="blog-content">
        <div className="ql-editor" dangerouslySetInnerHTML={{__html:blog.content}} />
      </div>

      <div className="likes-section">
        <button onClick={handleLike} className="like-btn" style={{backgroundColor:isLiked?"#007BFF":"#4CAF50"}}>
          👍 Like
        </button>
        <p>Likes: {likes}</p>
        {likee && <p className="error">{likee}</p>}
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        <textarea value={newComment} onChange={(e)=>setNewComment(e.target.value)} placeholder="Add a comment..." className="comment-input"/>
        <button onClick={handleComment} className="post-comment-btn">Post Comment</button>
        {commente && <p className="error">{commente}</p>}

        {comments.map((c)=>(
          <div key={c._id} className="comment">
            <p><strong>{c.name}</strong> <small>{new Date(c.createdAt).toLocaleString()}</small></p>
            <p>{c.comment}</p>
            {(admin || name===c.name || name===blog.uname) && (
              <button onClick={()=>confirmDelete("comment",c._id)} className="delete-comment-btn"><Trash2 size={20} /></button>
            )}
          </div>
        ))}
      </div>

      {showConfirm.show && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete this?</p>
          <button onClick={handleDelete} className="confirm-btn">Yes</button>
          <button onClick={cancelDelete} className="cancel-btn">No</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default BlogDetails;
