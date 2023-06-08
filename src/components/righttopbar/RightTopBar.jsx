import React, { useContext } from 'react'
import "./righttopbar.css"
import VideocamIcon from '@mui/icons-material/Videocam';
import { userContext } from '../../contextApi/Usercontext';
import ReceiverProvider, { receiverContext } from '../../contextApi/ReceiverProvider';

const RightTopBar = () => {

const {receiverData,dispatch} = useContext(receiverContext)
console.log(receiverData);


  return (

    <div className='right_topbar'>

       <div className='sender_container'>
         <img src={receiverData?.ReceiverImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}/>
         <h3>{receiverData?.ReceiverName}</h3>
       </div>
    
       <div className='videocam'>
           <VideocamIcon/>
       </div>
   
      
  
        
    </div>


  )
}

export default RightTopBar