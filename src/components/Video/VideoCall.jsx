import React, { useCallback, useEffect, useState } from 'react'
import "./videocall.css"
import ReactPlayer from "react-player";
import peer from "../../contextApi/Peer";
import {useSocket} from '../../contextApi/SocketProvider'

const VideoCall = ({close,myStream,remoteStream,remoteSocketId,handleCallUser,sendStreams,hangUpHandler }) => {





  return (
    <div className="videocall-container">
         

  {/* remote user stream        */}
      <div className='stream-container'>
      
        {remoteStream && (
        <>
          <ReactPlayer
            className="reactplayer"
            playing
            muted
            height="100%"
            width="100%"
            url={remoteStream}
            
          />
        </>
      )}
    </div>
 
   {/* user's stream */}

         <div className='userStream-container'>

         {myStream && (

          <ReactPlayer
            className="reactplayer"
            playing
            muted
            height="100%"
            width="100%"
            url={myStream}
          />

      )}
         </div>

       
      <div className='callhandlers-container'>
            <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
            {myStream && <button onClick={sendStreams}>Send Stream</button>}
            <button onClick={close}>close</button>
            {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
            {remoteSocketId && <button onClick={hangUpHandler}>HangUp</button>}

             </div>
      </div>

  )
}

export default VideoCall