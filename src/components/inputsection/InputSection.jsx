import React, { useContext, useEffect, useState } from 'react'
import"./inputsection.css"
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {userRequest} from "../../ApiCalls"
import { receiverContext } from '../../contextApi/ReceiverProvider';
import { userContext } from '../../contextApi/Usercontext';
import {useSocket} from '../../contextApi/SocketProvider'


const InputSection = () => {

const [message,setMessage] = useState("")
const {receiverData} = useContext(receiverContext)
const {data} = useContext(userContext)
const {socket}=useSocket();




const handleKey = (e)=>{
  e.code =="Enter" && handleSend();
}

const handleSend = async()=>{

try
{

   if((message.trim()?.length)!=0)
   {
    setMessage((prev)=>prev.trim())
     const res = await userRequest.post("/chat/messages",{ conversationId:receiverData.ConvoId,
                                                           senderId:data.UserId, // sender's Id
                                                           senderImage:data.UserDp,
                                                           text:message
                                                          })
   }
                                                      

  
}
catch(err){
   console.log(err);
}



 socket.emit("newMessage",{
  conversationId:receiverData.ConvoId,
  senderId:data.UserId, // sender's Id
  senderImage:data.UserDp,
  text:message,
  _id:receiverData.ConvoId+4
});



  setMessage("")

}

  return (
    <div className='input_container'>
      <div className='input_box'>
             <input type="text" placeholder='Type a message' onChange={e=>setMessage((e.target.value))} onKeyDown={handleKey} value={message}/>
             
             <div className='send' onClick={handleSend}>
                <SendIcon/>
             </div>
      </div>
      <label htmlFor="file" className='attachfile'>
        <AttachFileIcon className='attachicon'/>
      </label>
      <input style={{display:"none"}} id="file" type="file"/>
      
          
    </div>
  )
}

export default InputSection