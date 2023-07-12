import React, { useContext } from 'react'
import "./righttopbar.css"
import VideocamIcon from '@mui/icons-material/Videocam';
import { userContext } from '../../contextApi/Usercontext';
import ReceiverProvider, { receiverContext } from '../../contextApi/ReceiverProvider';
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../contextApi/SocketProvider';


const RightTopBar = () => {

const {receiverData,dispatch} = useContext(receiverContext)
const {data} = useContext(userContext);
const navigate = useNavigate();
const {socket} = useSocket();

const startVideoCall = ()=>{
   
  const User = data.Username;
  const convoId = receiverData.ConvoId;
  socket.emit("enterVideoCall",{User,convoId})

  navigate(`/videoCall/${receiverData.ReceiverId}`);
}

  return (

    <div className='right_topbar'>

       <div className='sender_container'>
         <img src={receiverData?.ReceiverImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}/>
         <h3>{receiverData?.ReceiverName}</h3>
       </div>
    
       <div className='videocam'>
        <button onClick ={startVideoCall}>
           <VideocamIcon/>
        </button>
       </div>
   
      
  
        
    </div>


  )
}

export default RightTopBar