import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import"./chatsection.css"
import Chat from '../chat/Chat'
import { userRequest } from '../../ApiCalls'
import { receiverContext } from '../../contextApi/ReceiverProvider'
import Loader from "./loader/Loader"
import InputSection from '../inputsection/InputSection'
import { userContext } from '../../contextApi/Usercontext'
import {useSocket} from '../../contextApi/SocketProvider'



const ChatSection = () => {


  const[chats,setChats] = useState(null)
  const scrollRef = useRef();
  const{receiverData} = useContext(receiverContext)
  const {data} = useContext(userContext)
  const {socket} = useSocket()


 useEffect(()=>{

     socket.on("connected",(data)=>
       {console.log(data);})
    
 },[socket])



  const getChats= useCallback(async()=>{

      try{
              const res = await userRequest.get(`/chat/messages/${receiverData.ConvoId}`)
              setChats(res.data)
              // console.log(res.data);
      }
      catch(err)
      {
         console.log(err);
      }
      const convoid = receiverData.ConvoId;
      const username= data.Username;
      socket.emit("privateChat",{convoid,username});

    },[data.Username, receiverData.ConvoId, socket]);

  useEffect(()=>{
    getChats();
  },[getChats, receiverData.ConvoId])


// sending message  
useEffect(()=>{
  socket.on("Message",(message)=>{
    console.log(message);
    setChats((prev)=>[...prev,message])
   })
   
},[])
console.log(chats);
// sending message  



useEffect(()=>{
  scrollRef.current?.scrollIntoView({bhaviour:"smooth"})
},[chats])


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
                    chats.map(
                      (item,index)=><div ref={scrollRef} key={index} className={`chat ${item.senderId==data.UserId ? "user":"receiver" }`}><Chat text={item.text} id = {item.senderId} url={item.senderImage} key={item._id} messageId={item._id} /></div>
                      )
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
    <InputSection />
    </>
    
  )
}

export default ChatSection