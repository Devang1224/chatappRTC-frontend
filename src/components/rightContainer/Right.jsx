import React, { useCallback, useContext } from 'react'
import "./right.css"
import RightTopBar from "../righttopbar/RightTopBar"
import ChatSection from "../chatsection/ChatSection"
import InputSection from "../inputsection/InputSection"
import ReceiverProvider, { receiverContext } from '../../contextApi/ReceiverProvider'
import MessagingImage from "../../assets/Messaging-rafiki.png"

const Right = () => {


const {receiverData} = useContext(receiverContext);

  return (

  receiverData.ReceiverName?<div className='right_container'>

      <RightTopBar/>
       <ChatSection/>
      <InputSection/>
    </div>
    :
<div className='right_container message'>
    <img src= {MessagingImage} style={{width:"35vw", height:"35vw"}}/>

</div>


  )
}

export default Right