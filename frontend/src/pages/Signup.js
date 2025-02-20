import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Signup(){
    const [email,setEmail]=useState("");
    const [username,setName]=useState("");
    const [password,setPass]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState(false);
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        try{
            const res=await axios.post("http://localhost:8000/api/users/createuser",{email,username,password});
            if(res.status==200)
            {
                setSuccess(true);
                setTimeout(()=>{
                    navigate("/auth/signin/");
                },3000);
            }
        }
        catch(e){
            if(e.response.status==400)
            {
                setError(e.response.data.message);
            }
            else
            {
            setError("Something went wrong...");
            console.log(e.response.data.message);
            }
        }
    }

    return (
        <div className="form-container">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <label>Email:</label>
              <input type="email" placeholder="Enter Email..." value={email} onChange={(e)=>setEmail(e.target.value)} required/>
      
              <label>Username:</label>
              <input type="text" placeholder="Enter Username..." value={username} onChange={(e)=>setName(e.target.value)} required/>
      
              <label>Password:</label>
              <input type="password" placeholder="Enter Password..." value={password} onChange={(e)=>setPass(e.target.value)} required/>
      
              <button type="submit">Sign Up</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Registered Successfully! Redirecting...</p>}
          </div>
        </div>
      );
}