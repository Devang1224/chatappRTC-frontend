import React, { useCallback, useContext, useEffect, useState } from 'react'
import "./righttopbar.css"
import VideocamIcon from '@mui/icons-material/Videocam';
import { userContext } from '../../contextApi/Usercontext';
import ReceiverProvider, { receiverContext } from '../../contextApi/ReceiverProvider';
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../contextApi/SocketProvider';
import VideoCall from '../Video/VideoCall';
import peer from "../../contextApi/Peer";



const RightTopBar = () => {

const {receiverData,dispatch} = useContext(receiverContext)
const {data} = useContext(userContext);
const navigate = useNavigate();
const {socket} = useSocket();
const [onGoingCall,setOnGoingCall] = useState(false)
const [remoteSocketId, setRemoteSocketId] = useState(null);
const [myStream, setMyStream] = useState();
const [remoteStream, setRemoteStream] = useState();


const startVideoCall = ()=>{
   
  const User = data.Username;
  const convoId = receiverData.ConvoId;
  socket.emit("enterVideoCall",{User,convoId})

  // navigate(`/videoCall/${receiverData.ReceiverId}`);

    setOnGoingCall(true)

}



// when user joins the chat room
const handleUserJoined = useCallback(({ User, id }) => {
  console.log(`Email ${User} joined room`);
  setRemoteSocketId(id);
}, []);


//when user press the video call button
const handleCallUser = useCallback(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  const offer = await peer.getOffer();
  socket.emit("user:call", { to: remoteSocketId, offer });
  setMyStream(stream);
}, [remoteSocketId, socket]);



const handleIncommingCall = useCallback(
  async ({ from, offer }) => {
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    console.log(`Incoming Call`, from, offer);
    const ans = await peer.getAnswer(offer);
    socket.emit("call:accepted", { to: from, ans });
  },
  [socket]
);

// sending user's stream to remote
const sendStreams = useCallback(() => {
  for (const track of myStream.getTracks()) {
    peer.peer.addTrack(track, myStream);
  }
}, [myStream]);


const handleCallAccepted = useCallback(
  ({ from, ans }) => {
    peer.setLocalDescription(ans);
    console.log("Call Accepted!");
    sendStreams();
  },
  [sendStreams]
);

// handling negotiatation
const handleNegoNeeded = useCallback(async () => {
  const offer = await peer.getOffer();
  socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
}, [remoteSocketId, socket]);


// checking if negotiation needed or not
useEffect(() => {
  peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
  return () => {
    peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
  };
}, [handleNegoNeeded]);

const handleNegoNeedIncomming = useCallback(
  async ({ from, offer }) => {
    const ans = await peer.getAnswer(offer);
    socket.emit("peer:nego:done", { to: from, ans });
  },
  [socket]
);

const handleNegoNeedFinal = useCallback(async ({ ans }) => {
  await peer.setLocalDescription(ans);
}, []);

//handling negotiation


// checking if stream tracks are coming from the remote
useEffect(() => {
  peer.peer.addEventListener("track", async (ev) => {
    const remoteStream = ev.streams;
    console.log("GOT TRACKS!!");
    setRemoteStream(remoteStream[0]);
  });
}, []);


//hangUp call
const HangUpHandler = useCallback(()=>{
  // peer.hangUp();
},[]);


useEffect(() => {
  socket.on("user-joined", handleUserJoined);
  socket.on("incomming:call", handleIncommingCall);
  socket.on("call:accepted", handleCallAccepted);
  socket.on("peer:nego:needed", handleNegoNeedIncomming);
  socket.on("peer:nego:final", handleNegoNeedFinal);

  return () => {
    socket.off("user-joined", handleUserJoined);
    socket.off("incomming:call", handleIncommingCall);
    socket.off("call:accepted", handleCallAccepted);
    socket.off("peer:nego:needed", handleNegoNeedIncomming);
    socket.off("peer:nego:final", handleNegoNeedFinal);
  };
}, [
  socket,
  handleUserJoined,
  handleIncommingCall,
  handleCallAccepted,
  handleNegoNeedIncomming,
  handleNegoNeedFinal,
]);





  return (

    <div className='right_topbar'>

       <div className='sender_container'>
         <img src={receiverData?.ReceiverImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}/>
         <h3>{receiverData?.ReceiverName}</h3>
       </div>
    
       <div className='videocam'>
        <button onClick ={startVideoCall}>
           <VideocamIcon/>
        </button>
       </div>
   
      
      {onGoingCall && <VideoCall
                      remoteStream={remoteStream} 
                      myStream={myStream} 
                      remoteSocketId={remoteSocketId} 
                      handleCallUser ={handleCallUser}
                      sendStreams={sendStreams}
                      close = {()=>setOnGoingCall(false)}
                      hangUpHandler={HangUpHandler}
                       />}
        
    </div>


  )
}

export default RightTopBar