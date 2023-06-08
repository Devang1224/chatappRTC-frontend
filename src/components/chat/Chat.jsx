import React, { useContext } from 'react'
import "./chat.css"
import { userContext } from '../../contextApi/Usercontext'


const Chat = (props) => {

  const {data} = useContext(userContext)
  console.log(props.url);
  return (
    <div className={`chat ${props.id==data.UserId && "user" }`}>
        <img src={props.url || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"} alt="" />
        <p>{props.text}</p>
    </div>
  )
}

export default Chat