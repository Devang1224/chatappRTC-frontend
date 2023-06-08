import React, { useContext, useEffect, useState } from 'react'
import"./chatsection.css"
import Chat from '../chat/Chat'
import { userRequest } from '../../ApiCalls'
import { receiverContext } from '../../contextApi/ReceiverProvider'
import Loader from "./loader/Loader"

const ChatSection = () => {


  const[chats,setChats] = useState(null)
  const{receiverData} = useContext(receiverContext)




  useEffect(()=>{

    const getChats= async()=>{

      try{
              const res = await userRequest.get(`/chat/messages/${receiverData.ConvoId}`)
              setChats(res.data)
              console.log(res.data);
      }
      catch(err)
      {
         console.log(err);
      }

    }

    getChats();

  },[receiverData.ConvoId])

console.log(chats);


  return (


    <div className='chat_container'>
        

        {
          chats==null
          ?
          <Loader/>
          :
          (chats?.length!=0
                   ?
                    chats.map((item)=><Chat text={item.text} id = {item.senderId} url={item.senderImage} key={item._id}/> )
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
  )
}

export default ChatSection