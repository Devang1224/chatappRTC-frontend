import React, { useCallback, useContext, useEffect, useState } from 'react'
import "./righttopbar.css"
import VideocamIcon from '@mui/icons-material/Videocam';
import { userContext } from '../../contextApi/Usercontext';
import ReceiverProvider, { receiverContext } from '../../contextApi/ReceiverProvider';
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../contextApi/SocketProvider';
import VideoCall from '../Video/VideoCall';
import peer from "../../contextApi/Peer";
import Modal from 'react-modal';
import { setAppElement } from 'react-modal';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CloseIcon from '@mui/icons-material/Close';

// Set the app element
setAppElement('#root');

const RightTopBar = () => {

const {receiverData,dispatch} = useContext(receiverContext)
const {data} = useContext(userContext);
const navigate = useNavigate();
const {socket} = useSocket();
const [onGoingCall,setOnGoingCall] = useState(false)
const [remoteSocketId, setRemoteSocketId] = useState(null);
const [myStream, setMyStream] = useState();
const [remoteStream, setRemoteStream] = useState();
const [incomingCall,setIncomingCall] = useState(false)
const [isNegotiationDone, setIsNegotiationDone] = useState(false);
const [videoEnabled, setVideoEnabled] = useState(true);
const[audioEnabled,setAudioEnabled] = useState(true)
const [remoteUser,setRemoteUser] = useState(null)

// function to start video call
const startVideoCall = ()=>{
   
  const User = data.Username;
  const convoId = receiverData.ConvoId;
  const Receiver = receiverData.ReceiverName;
  socket.emit("roomJoined",{User,convoId,Receiver})

  // navigate(`/videoCall/${receiverData.ReceiverId}`);

    setOnGoingCall(true)

}



// when user joins the chat room
const handleUserJoined = useCallback(({ User, id }) => {
  console.log(` ${User} joined room ${id}`);
  setRemoteSocketId(id);  // on google devang's socket id when jatin->devang
  setRemoteUser(User);
   setIncomingCall(true)

}, []);

// this function is setting the users or caller remoteSocketid equal to receiver's socket id
const handleSetRemoteIdForUser = useCallback(({Receiver,receiverid})=>{
  console.log(` ${Receiver} joined room ${receiverid}`);
  setRemoteSocketId(receiverid);
},[])


//when user accept the modal
const handleModalAccepted = ()=>{
      socket.emit("modalaccepted",{to:remoteSocketId});
}


const handleCallUser = useCallback(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: audioEnabled,
    video:  videoEnabled ? { facingMode: 'user' } : false,
  });

  
  setMyStream(stream);

  const offer = await peer.getOffer();
  socket.emit("user:call", { from:"jatin",to: remoteSocketId, offer });    // going to devang
}, [audioEnabled, remoteSocketId, socket, videoEnabled]);



const handleIncommingCall = useCallback(
  async ({ from, offer }) => {
    setRemoteSocketId(from);      // jatins id on devang's window
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video:  videoEnabled ? { facingMode: 'user' } : false,
    });
    console.log("89",stream);
    setMyStream(stream);
    console.log(`Incoming Call`, from, offer);
    const ans = await peer.getAnswer(offer);
    socket.emit("call:accepted", { to: from, ans }); // devang->jatin
  },
  [socket, videoEnabled]
);


const handleCallAccepted = useCallback(
  ({ from, ans }) => {            // from = devang's id
 handleNegoNeeded(from)

    peer.setLocalDescription(ans);
    console.log("ans coming from",from,ans);
    console.log("Call Accepted!");
    console.log("104",myStream);
  },
  []
);




// handling negotiatation
const handleNegoNeeded = useCallback(async (from) => {
  
  const offer = await peer.getOffer(); 
  socket.emit("peer:nego:needed", { offer, to: from });   // on jatin's window to=devang's id
  console.log("negotiation part",from);


  // sendStreams();
}, [remoteSocketId, socket]);


// checking if negotiation needed or not
// useEffect(() => {
//   peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
//   return () => {
//     peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//   };
// }, [handleNegoNeeded]);

const handleNegoNeedIncomming = useCallback(
  async ({ from, offer }) => {
    const ans = await peer.getAnswer(offer);
    socket.emit("peer:nego:done", { to: from, ans });  // from =jatin

  },
  [socket]
);

const handleNegoNeedFinal = useCallback(async ({ ans }) => {
  await peer.setLocalDescription(ans);
  setIsNegotiationDone(true);
}, []);

//handling negotiation

// sending user's stream to remote
const sendStreams = useCallback(() => {
  if (myStream) {

    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  } else {
    console.log("myStream is undefined");
  }
}, [myStream]);



// checking if stream tracks are coming from the remote
useEffect(() => {
  peer.peer.addEventListener("track", async (ev) => {
    const remoteStream = ev.streams[0];
    console.log("GOT TRACKS!!");
    setRemoteStream(remoteStream);
    console.log(remoteStream);
  });
}, []);


useEffect(() => {
  socket.on("user-joined", handleUserJoined);
  socket.on("setremoteidfor-user",handleSetRemoteIdForUser)
  socket.on("youcancallusernow",handleCallUser)
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
}, [socket,
   handleUserJoined,
   handleIncommingCall,
   handleCallAccepted, 
   handleNegoNeedIncomming, 
   handleNegoNeedFinal,
   handleSetRemoteIdForUser,
   handleCallUser]);


if(isNegotiationDone)console.log("negotiation done ");


useEffect(() => {
  if (myStream) {
    sendStreams();
  }
}, [myStream, sendStreams]);



// end the call
const hangUpHandler = useCallback(() => {
  // Stop local media streams



  const localVideoTrack = myStream.getVideoTracks()[0];
  const localAudioTrack = myStream.getAudioTracks()[0];

  if (myStream) {
    const videoTrack = myStream.getVideoTracks()[0];
    const audioTrack = myStream.getAudioTracks()[0];

    // Remove video track
    if (videoTrack) {
      myStream.removeTrack(videoTrack);
      videoTrack.stop();
    }

    // Remove audio track
    if (audioTrack) {
      myStream.removeTrack(audioTrack);
      audioTrack.stop();
    }
  }

  // Close the Peer connection
  peer.peer.close();

  // Reset the state variables
  setMyStream(null);
  setRemoteStream(null);
  setOnGoingCall(false);
  setIsNegotiationDone(false);

}, [myStream]);

console.log(remoteStream);



setTimeout(()=>{
setIncomingCall(false);
},20000)


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
   
      

      { incomingCall && <div className='incomingCallModal'>
               
               <CloseIcon className='closeicon'/>
               <div className='incomingCall-headerContainer'> 
                 <h2>Incoming Call</h2>
                 <h2 className='username'>{remoteUser}</h2>
                </div>

                <div className='callloader-container'><span className="callloader"></span></div>
               
              
              <div className='handleCall-container'>
                <button onClick={() => setIncomingCall(false)} className="rejectCall"><CallEndIcon style={{color:"white"}}/></button>
                <button onClick={() => {
                   setOnGoingCall(true);
                   setIncomingCall(false);
                   handleModalAccepted()
                 }} className='acceptCall'><CallIcon style={{color:"white"}}/></button>
              </div>
             

        </div>
      }

     




      
      {onGoingCall && <VideoCall
                      remoteStream={remoteStream} 
                      myStream={myStream} 
                      remoteSocketId={remoteSocketId} 
                      handleCallUser ={handleCallUser}
                      sendStreams={sendStreams}
                      close = {()=>setOnGoingCall(false)}
                      hangUpHandler={hangUpHandler}
                      videoEnabled={videoEnabled}
                      audioEnabled={audioEnabled}
                      setVideo={() => setVideoEnabled((prevEnabled) => !prevEnabled)}
                      setAudio={()=>setAudioEnabled((prev)=>!prev)}
                       
                       />}
      


    </div>


  )
}

export default RightTopBar