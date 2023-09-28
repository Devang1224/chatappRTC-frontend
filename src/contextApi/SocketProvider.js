import React, { createContext, useContext, useMemo, useState } from 'react'
import {io} from "socket.io-client";


export const socketContext = createContext(null);

export const useSocket = ()=>{              // custom hook now you dont have to use useContext in every single file
    return useContext(socketContext);

}


const SocketProvider = ({children}) => {

const socket = useMemo(()=>io("http://localhost:3000"),[])
// http://localhost:3000
// https://chatapprtc-backend-production.up.railway.app
  return (
    <socketContext.Provider value={{socket}}>
       {children}
   </socketContext.Provider>
  )

}

export default SocketProvider