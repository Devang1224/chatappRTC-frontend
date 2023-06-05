import React, { useContext } from 'react'
import "./righttopbar.css"
import VideocamIcon from '@mui/icons-material/Videocam';
import { userContext } from '../../contextApi/Usercontext';

const RightTopBar = () => {



  return (
    <div className='right_topbar'>

       <div className='sender_container'>
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"/>
         <h3></h3>
       </div>
    
       <div className='videocam'>
           <VideocamIcon/>
       </div>
   
      
  
        
    </div>
  )
}

export default RightTopBar