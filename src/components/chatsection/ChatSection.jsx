import React, { useContext, useEffect, useRef, useState } from 'react'
import"./chatsection.css"
import Chat from '../chat/Chat'
import { userRequest } from '../../ApiCalls'
import { receiverContext } from '../../contextApi/ReceiverProvider'
import Loader from "./loader/Loader"
import io  from "socket.io-client";
import InputSection from '../inputsection/InputSection'

const END_POINT = "http://localhost:3000";


const ChatSection = () => {


  const[chats,setChats] = useState(null)
 const scrollRef = useRef();
  const{receiverData} = useContext(receiverContext)

  const socket = useRef();


 useEffect(()=>{
    socket.current=io(END_POINT);
     socket.current.on("connected",(data)=>
       {console.log(data);})
    
 },[])



    const getChats= async()=>{

      try{
              const res = await userRequest.get(`/chat/messages/${receiverData.ConvoId}`)
              setChats(res.data)
              // console.log(res.data);
      }
      catch(err)
      {
         console.log(err);
      }
      socket.current.emit("privateChat",receiverData.ConvoId)

    }

  useEffect(()=>{

    getChats();


  },[receiverData.ConvoId])


useEffect(()=>{
  socket.current.on("Message",(message)=>{
    console.log(message);
    setChats((prev)=>[...prev,message])
   })
   
},[])
console.log(chats);

  return (

<>
    <div className='chat_container'>
        

        {
          chats==null
          ?
          <Loader/>
          :
          (chats?.length!=0
                   ?
                    chats.map((item)=><Chat text={item.text} id = {item.senderId} url={item.senderImage} key={item._id} messageId={item._id}/> )
                     :
                   <div style={{
                      width:"100%",
                      height:"100%",
                      display:"flex",
                      flexDirection:"column",
                      justifyContent:"center",
                      alignItems:"center",
                      opacity:0.6,
                     }}>
                           <h2>No Messages</h2>
                           <p>You currently have no messages.</p>
                   </div>
           )

          
        }

       
       </div>
    <InputSection socket={socket} />
    </>
    
  )
}

export default ChatSection