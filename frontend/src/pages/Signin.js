import {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../style.css";

function Signin() {
  const [email,setEmail]=useState("");
  const [password,setPass]=useState("");
  const [error,setError]=useState("");
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");
    try{
      const res=await axios.post("http://localhost:8000/api/auth/loginuser",{
        email,password},{withCredentials:true,
          headers:{'Content-Type':'application/json'}
      });
      if(res.status==201)
      {
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('username',res.data.user.username);
        navigate("/");
      }
      else
      {
        alert(res.data.message);
      }
    }
    catch(e){
      if(e.response.status==401)
      {
        setError(e.response.data.message);
      }
      else
      setError("Something went wrong...");
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email..." value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          
          <label>Password:</label>
          <input type="password" placeholder="Enter your Password..." value={password} onChange={(e)=>setPass(e.target.value)} required/>
          
          <button type="submit">Sign In</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}  

export default Signin;
