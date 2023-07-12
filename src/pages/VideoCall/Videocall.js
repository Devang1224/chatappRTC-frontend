import React,{useCallback, useEffect, useState} from 'react'
import {useSocket} from '../../contextApi/SocketProvider'
import { usePeer } from '../../contextApi/Peer'
import ReactPlayer from "react-player"

const Videocall = () => {

const {socket}= useSocket();
const {peer,createOffer,createAnswer,setRemoteAnswer,sendUsersMedia,remoteStream} = usePeer();
const [myStream,setMyStream] = useState(null) // it will contain the senders stream
const [callFromUser,setCallFromUser] = useState(null)// it will store the user who is calling
const [toggleVideo,setToggleVideo] = useState(true)

//sending the offer
const handleNewUserJoined = useCallback( async(data)=>{
    const {User} = data;
    console.log("user joined room",User);
     setCallFromUser(User);
    const offer = await createOffer();       // users offer 
    socket.emit("sendOffer",{User,offer});      //sending the offer
    console.log(offer);

},[createOffer,socket]);



//handling incoming call
const handleIncomingOffer = useCallback(async (data)=>{

const {fromUser,offer} = data;
console.log("incoming call from ",fromUser);
console.log("his offer",offer);

 setCallFromUser(fromUser);

const answer = await createAnswer(offer);
socket.emit("offerAccepted",{fromUser,answer});     //sending answer to the user who had sent us the offer

},[createAnswer,socket])



// accepting the call
const handleIncomingAnswer = useCallback(async(data)=>{

    const {answer} = data;
    console.log("call got accepted" ,data);
    // console.log("before answer",peer.connectionState);
     await setRemoteAnswer(answer);
    // console.log("after answer",peer.connectionState);

   
},[setRemoteAnswer])



useEffect(()=>{
    socket.on("user-joined",handleNewUserJoined)
    socket.on("incomingOffer",handleIncomingOffer)
    socket.on("incomingAnswer",handleIncomingAnswer)


return ()=>{                                            // cleanup function
    socket.off('user-joined',handleNewUserJoined)
    socket.off("incomingOffer",handleIncomingOffer)
    socket.off("incomingAnswer",handleIncomingAnswer)

}

},[socket,handleNewUserJoined,handleIncomingOffer,handleIncomingAnswer])




// getting user media

const getUserMedia = useCallback(async()=>{

      const stream = await navigator.mediaDevices.getUserMedia({audio:false,video:toggleVideo});
      
     sendUsersMedia(stream);
      setMyStream(stream);


},[sendUsersMedia])

useEffect(()=>{

    getUserMedia();
},[getUserMedia])

// getting user media


// handling negotiation

const handleNegotiation = useCallback(async ()=>{
    
    const localOffer = peer.localDescription;  // we dont have to create offer again bcz we have already set the offer to out localDescription in peer.js file
    socket.emit("sendOffer",{User:callFromUser,offer:localOffer});  // again calling the user 

},[peer.localDescription,callFromUser, socket])


useEffect(()=>{
    peer.addEventListener('negotiationneeded',handleNegotiation);   // event listener to check negotiation needed or not
    return()=>{      //cleanup function
       peer.removeEventListener('negotiationneeded',handleNegotiation);
    
     }
},[handleNegotiation, peer])
// handling negotiation

const handleToggleVideo = () => {
    setToggleVideo((prevToggleVideo) => !prevToggleVideo);
  };


  return (
    <div>
        <h4>You are connected to {callFromUser}</h4>
        <button >
        {toggleVideo ? 'Disable Video' : 'Enable Video'}
      </button>
       <h1>VideoPage</h1>
        <ReactPlayer url={myStream} muted playing={false}></ReactPlayer> {/* displaying user's stream */}
        <ReactPlayer url={remoteStream} muted playing={false}></ReactPlayer>   {/* displaying remote stream */}
        
    </div>

  )
}

export default Videocall