import React, { useContext, useState } from "react";
import "./register.css"
import { Link } from "react-router-dom";
import { userRequest } from "../../ApiCalls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../contextApi/Usercontext";



const Register = () => {

const [error,setError] = useState("")
const {dispatch} = useContext(userContext)
const navigate = useNavigate();

const handleSubmit = async(e)=>{

  e.preventDefault()
  const username = e.target[0].value;
  const email = e.target[1].value
  const password = e.target[2].value;
  
  
    await userRequest.post("/user/register",{username,email,password}).then((res)=>{
      dispatch({ type: "SAVE_USER", payload: { username: res.data.savedUser.username, id:res.data.id } });
       navigate("/");
      

  }).catch((err)=>{setError(err?.response?.data)});



}




  return (
    <div className="register_container">
      <div className="form-box">
        <form className="registerform" onSubmit={handleSubmit}>
          <span className="title">Sign up</span>
          <span className="subtitle">Create a free account with your email.</span>
          <div className="form-container">
            <input type="text" className="registerinput" placeholder="Username" required maxLength={100}/>
            <input type="email" className="registerinput" placeholder="Email" required maxLength={100}/>
            <input type="password" className="registerinput" placeholder="Password" required minLength={10}/>
          </div>
          <button type="submit">Sign up</button>
        </form>
        {
            error && <p style={{color:"red",textAlign:"center"}}>{error}</p>
        }
        <div className="form-section">
          <p>
            Have an account? <Link to={'/login'}>Sign in</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
