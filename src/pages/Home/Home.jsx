import React, { useContext } from 'react'
import"./home.css"
import Left from '../../components/leftContainer/Left'
import Right from '../../components/rightContainer/Right'
import ReceiverProvider from '../../contextApi/ReceiverProvider'
import { useSocket } from '../../contextApi/SocketProvider';
import { userContext } from '../../contextApi/Usercontext'

const Home = () => {
  const {socket} = useSocket();
  const {data} = useContext(userContext);

   
  const User = data.Username;
socket.emit("userJoinedTheChat",{User})

  return (
    <ReceiverProvider>

    <div className='main_container'>
      <Left/>
      <Right/>
    </div>
    </ReceiverProvider>

  )
}

export default Home