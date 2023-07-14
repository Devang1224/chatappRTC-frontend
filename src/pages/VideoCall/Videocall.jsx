// // import React,{useCallback, useEffect, useState} from 'react'
// // import {useSocket} from '../../contextApi/SocketProvider'
// // import { usePeer } from '../../contextApi/Peer'
// // import ReactPlayer from "react-player"

// // const Videocall = () => {

// // const {socket}= useSocket();
// // const {
// //     peer,
// //     createOffer,
// //     createAnswer,
// //     setRemoteAnswer,
// //     sendUsersMedia,
// //     createAnswerForNegotiation,
    
// //     } = usePeer();
// // const [myStream,setMyStream] = useState(null) // it will contain the senders stream
// // const [callFromUser,setCallFromUser] = useState(null)// it will store the user who is calling
// // const [toggleVideo,setToggleVideo] = useState(true)
// // const [remoteStream,setRemoteStream] = useState()

// // //sending the offer
// // const handleNewUserJoined = useCallback( async(data)=>{
// //     const {User} = data;
// //     console.log("user joined room",User);
// //      setCallFromUser(User);
// //     const offer = await createOffer();       // users offer 
// //     socket.emit("sendOffer",{User,offer});      //sending the offer
// //     console.log(offer);

// //     const stream = await navigator.mediaDevices.getUserMedia({
// //       audio: true,
// //       video: true,
// //     });
// // setMyStream(stream);
// // },[createOffer,socket]);



// // //handling incoming call
// // const handleIncomingOffer = useCallback(async (data)=>{

// // const {fromUser,offer} = data;
// // console.log("incoming call from ",fromUser);
// // console.log("his offer",offer);

// //  setCallFromUser(fromUser);

// // const answer = await createAnswer(offer);
// // socket.emit("offerAccepted",{fromUser,answer});     //sending answer to the user who had sent us the offer
// // const stream = await navigator.mediaDevices.getUserMedia({
// //   audio: true,
// //   video: true,
// // });
// // setMyStream(stream);
// // },[createAnswer,socket])


// // const sendStreams = useCallback(() => {
// // console.log(myStream);

// //   for (const track of myStream.getTracks()) {
// //     peer.addTrack(track, myStream);
// //   }
// // }, [myStream]);

// // useEffect(() => {
// //   if (myStream) {
// //     sendStreams();
// //   }
// // }, [myStream, sendStreams]);

// // // accepting the call
// // const handleIncomingAnswer = useCallback(async(data)=>{

// //     const {answer} = data;
// //     console.log("call got accepted" ,data);
// //      await setRemoteAnswer(answer);
// //     //  sendStreams();
   
// // },[ setRemoteAnswer])


// // // handling negotiation

// // const handleNegotiationNeeded  = useCallback(async ()=>{

// // //   const offer = await peer.createOffer();
// // //   socket.emit("negotiationNeeded",{fromUser:callFromUser,offer});
// // //  console.log("oops negotiation needed with user",callFromUser);

// // },[callFromUser, peer, socket])


// // const handleIncomingNegotiation = useCallback(async ({ fromUser, offer }) => {
// //   // if (peer.connectionState === 'stable') {
// //   //   console.log('Negotiation not needed. Connection is already stable.');
// //   //   return;
// //   // }

// //   // if (peer.signalingState === 'have-local-offer' || peer.signalingState === 'have-remote-offer') {
// //   //   console.log('Negotiation in progress. Skipping incoming negotiation offer.');
// //   //   return;
// //   // }

// //   // try {
// //   //   await peer.setRemoteDescription(offer);

// //   //   if (peer.signalingState === 'have-remote-offer') {

// //   //     const answer = await peer.setLocalDescription( await peer.createAnswer())
// //   //     // await peer.setLocalDescription(answer);
// //   //     // socket.emit("negotiationAnswer", { fromUser, answer });
// //   //     console.log('Negotiation answer:', answer);
// //   //   }
// //   // } catch (error) {
// //   //   console.error('Error handling incoming negotiation:', error);
// //   // }

// // }, [peer, socket]);


// // const handleNegotiationIncomingAnswer = useCallback(async({ans})=>{

// //     // await peer.setLocalDescription(ans);

 
// // },[peer])


// // useEffect(()=>{
// //     socket.on("user-joined",handleNewUserJoined)
// //     socket.on("incomingOffer",handleIncomingOffer)
// //     socket.on("incomingAnswer",handleIncomingAnswer)
// //     socket.on("negotiationNeeded",handleIncomingNegotiation)
// //     socket.on("negotiationIncomingAnswer",handleNegotiationIncomingAnswer)


// // return ()=>{                                            // cleanup function
// //     socket.off('user-joined',handleNewUserJoined)
// //     socket.off("incomingOffer",handleIncomingOffer)
// //     socket.off("incomingAnswer",handleIncomingAnswer)
// //     socket.off("negotiationNeeded",handleIncomingNegotiation)
// //     socket.off("negotiationIncomingAnswer",handleNegotiationIncomingAnswer)


// // }

// // },[socket, handleNewUserJoined, handleIncomingOffer, handleIncomingAnswer, handleIncomingNegotiation, handleNegotiationIncomingAnswer])





// // useEffect(()=>{
// //     peer.addEventListener('negotiationneeded',handleNegotiationNeeded);   // event listener to check negotiation needed or not
// //     return()=>{      //cleanup function
// //        peer.removeEventListener('negotiationneeded',handleNegotiationNeeded);
    
// //      }
// // },[handleNegotiationNeeded, peer,callFromUser])
// // // handling negotiation




// // // getting user media

// // // const getUserMedia = useCallback(async()=>{

// // //     const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
    
// // //    sendUsersMedia(stream);
// // //     setMyStream(stream);


// // // },[sendUsersMedia])

// // // useEffect(()=>{

// // //   getUserMedia();
// // // },[getUserMedia])

// // useEffect(() => {
// //   peer.addEventListener("track", (event) => {
// //     const receivedStream = new MediaStream();
// //     receivedStream.addTrack(event.track);
// //     setRemoteStream(receivedStream);
// //     console.log("GOT TRACKS!!");
// //   });
// // }, [peer]);


// // // getting user media



// //   return (
// //     <div>
// //         <h4>You are connected to {callFromUser}</h4>
// //         <button >
// //         {toggleVideo ? 'Disable Video' : 'Enable Video'}
// //       </button>
// //        <h1>VideoPage</h1>
// //         <ReactPlayer url={myStream} muted playing></ReactPlayer> {/* displaying user's stream */}
// //         <ReactPlayer url={remoteStream} muted playing></ReactPlayer>   {/* displaying remote stream */}
        
// //     </div>

// //   )
// // }

// // export default Videocall


// import React, { useEffect, useCallback, useState } from "react";
// import ReactPlayer from "react-player";
// import peer from "../../contextApi/Peer";
// import {useSocket} from '../../contextApi/SocketProvider'


// const Videocall = () => {
//   const {socket} = useSocket();
//   const [remoteSocketId, setRemoteSocketId] = useState(null);
//   const [myStream, setMyStream] = useState();
//   const [remoteStream, setRemoteStream] = useState();

//   const handleUserJoined = useCallback(({ User, id }) => {
//     console.log(`Email ${User} joined room`);
//     setRemoteSocketId(id);
//   }, []);

//   const handleCallUser = useCallback(async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });
//     const offer = await peer.getOffer();
//     socket.emit("user:call", { to: remoteSocketId, offer });
//     setMyStream(stream);
//   }, [remoteSocketId, socket]);

//   const handleIncommingCall = useCallback(
//     async ({ from, offer }) => {
//       setRemoteSocketId(from);
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setMyStream(stream);
//       console.log(`Incoming Call`, from, offer);
//       const ans = await peer.getAnswer(offer);
//       socket.emit("call:accepted", { to: from, ans });
//     },
//     [socket]
//   );

//   const sendStreams = useCallback(() => {
//     for (const track of myStream.getTracks()) {
//       peer.peer.addTrack(track, myStream);
//     }
//   }, [myStream]);

//   const handleCallAccepted = useCallback(
//     ({ from, ans }) => {
//       peer.setLocalDescription(ans);
//       console.log("Call Accepted!");
//       sendStreams();
//     },
//     [sendStreams]
//   );

//   const handleNegoNeeded = useCallback(async () => {
//     const offer = await peer.getOffer();
//     socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
//   }, [remoteSocketId, socket]);

//   useEffect(() => {
//     peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
//     return () => {
//       peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//     };
//   }, [handleNegoNeeded]);

//   const handleNegoNeedIncomming = useCallback(
//     async ({ from, offer }) => {
//       const ans = await peer.getAnswer(offer);
//       socket.emit("peer:nego:done", { to: from, ans });
//     },
//     [socket]
//   );

//   const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//     await peer.setLocalDescription(ans);
//   }, []);

//   useEffect(() => {
//     peer.peer.addEventListener("track", async (ev) => {
//       const remoteStream = ev.streams;
//       console.log("GOT TRACKS!!");
//       setRemoteStream(remoteStream[0]);
//     });
//   }, []);

//   useEffect(() => {
//     socket.on("user-joined", handleUserJoined);
//     socket.on("incomming:call", handleIncommingCall);
//     socket.on("call:accepted", handleCallAccepted);
//     socket.on("peer:nego:needed", handleNegoNeedIncomming);
//     socket.on("peer:nego:final", handleNegoNeedFinal);

//     return () => {
//       socket.off("user-joined", handleUserJoined);
//       socket.off("incomming:call", handleIncommingCall);
//       socket.off("call:accepted", handleCallAccepted);
//       socket.off("peer:nego:needed", handleNegoNeedIncomming);
//       socket.off("peer:nego:final", handleNegoNeedFinal);
//     };
//   }, [
//     socket,
//     handleUserJoined,
//     handleIncommingCall,
//     handleCallAccepted,
//     handleNegoNeedIncomming,
//     handleNegoNeedFinal,
//   ]);

//   return (
//     <div>
//       <h1>Room Page</h1>
//       <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
//       {myStream && <button onClick={sendStreams}>Send Stream</button>}
//       {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
//       {myStream && (
//         <>
//           <h1>My Stream</h1>
//           <ReactPlayer
//             playing
//             muted
//             height="100px"
//             width="200px"
//             url={myStream}
//           />
//         </>
//       )}
//       {remoteStream && (
//         <>
//           <h1>Remote Stream</h1>
//           <ReactPlayer
//             playing
//             muted
//             height="100px"
//             width="200px"
//             url={remoteStream}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default Videocall;