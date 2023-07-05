import React, { useContext } from 'react'
import "./topbar.css"
import { userContext } from '../../contextApi/Usercontext'
import { useNavigate } from 'react-router-dom'


const Topbar = () => {

const{data} = useContext(userContext);
const navigate = useNavigate();
const {dispatch} = useContext(userContext)

const Logout = ()=>{
 
  dispatch({ type: "LOGOUT"});
  navigate("/login");
}

  return (
    <div className='left_topbar'>
   

    <div className='user_container'>
        <img src={data.UserDp || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}/>
        <p>{data.Username}</p>
    </div>
    <button onClick={Logout}>Logout</button>

    </div>
  )
}

export default Topbar