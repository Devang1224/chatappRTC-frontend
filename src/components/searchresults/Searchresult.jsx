import React, { useContext, useState } from 'react'
import "./searchresult.css"
import { userRequest } from '../../ApiCalls'
import { userContext } from '../../contextApi/Usercontext'

const Searchresult = (props) => {

  const {data} = useContext(userContext);

 const[currentUserData,setCurrentUserData] = useState({
  userId:data.UserId,
  userName:data.Username,
  userImage:data.UserDp
 })

 const [receiverData,setReceiverData]=useState({
      receiverId:props.id,
      receiverName:props.username,
      receiverImage:props.url
    })

const senderData = {
  senderId:data.UserId,
  senderName:data.Username,
  senderImage:data.UserDp
 }

  const handleClick = async()=>{ 
    
    try{
      
      if(receiverData.receiverId!==data.UserId){
         const res = await userRequest.post("/chat/conversation",{userData:currentUserData,receiverData:receiverData,senderData})
          
        }
    }

    catch(err){
      console.log(err);
    }
    props.box(false);
  }

  return (

    <div className='searchresult_container' onClick={handleClick}>
          <img src={props.url || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}/>
            <h3>{props.username}</h3>
    </div>
  )
  }

export default Searchresult