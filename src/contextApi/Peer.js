import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'


export const peerContext = createContext(null);

export const usePeer = ()=>{
    return useContext( peerContext);
}

const PeerProvider = ({children}) => {

const[remoteStream,setRemoteStream] = useState(null)



  const peer = useMemo(
    ()=>new RTCPeerConnection(        // RTCPeerConnection act as TURN servers
    {
         iceServers:[
            {
                urls:[
                   "stun:stun.l.google.com:19302",
                   "stun:global.stun.twilio.com:3478"
                ]
            }
         ]
    }
  ),[]) 


   const createOffer = async()=>{
     
    const offer = await peer.createOffer();         // creating an offer for user
    await peer.setLocalDescription(offer);          // set the offer in the user's local description

    return offer;

   }


const createAnswer = async (offer)=>{
    await peer.setRemoteDescription(offer);
    
    const answer = await peer.createAnswer();   // creating answer for incoming offer
    await peer.setLocalDescription(answer);
    
    return answer;
   }
//new RTCSessionDescription(ans)

const setRemoteAnswer = async (answer)=>{    // set the incoming answer in your remote description
   
    console.log(answer);
    await peer.setRemoteDescription(answer);

}




const sendUsersMedia = async (stream)=>{

      const tracks = stream.getTracks();           // getTracks represents all the MediaStreamTrack objects in this stream
     for(const track of tracks){
        peer.addTrack(track,stream)  // addTrack() adds a new media track to the set of tracks which will be transmitted to the other peer.
     }

}

// handling another users media
const handleRemoteStream = useCallback((e)=>{
    const streams = e.streams;
     setRemoteStream(streams[0])
 
},[])




useEffect(()=>{
 peer.addEventListener('track',handleRemoteStream)

 return()=>{
    peer.removeEventListener('track',handleRemoteStream)

 }

},[peer, handleRemoteStream])

// handling another users media






  return (
  <peerContext.Provider value={{peer, createOffer, createAnswer,setRemoteAnswer, sendUsersMedia, remoteStream}}>
    {children}
  </peerContext.Provider>
  )
}

export default PeerProvider