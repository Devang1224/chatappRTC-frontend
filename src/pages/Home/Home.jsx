import React from 'react'
import"./home.css"
import Left from '../../components/leftContainer/Left'
import Right from '../../components/rightContainer/Right'
import ReceiverProvider from '../../contextApi/ReceiverProvider'

const Home = () => {
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