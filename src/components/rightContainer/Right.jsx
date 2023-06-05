import React from 'react'
import "./right.css"
import RightTopBar from "../righttopbar/RightTopBar"
import ChatSection from "../chatsection/ChatSection"
import InputSection from "../inputsection/InputSection"

const Right = () => {
  return (
    <div className='right_container'>
      <RightTopBar/>
       <ChatSection/>
      <InputSection/>
    </div>
  )
}

export default Right