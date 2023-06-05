import React from 'react'
import"./home.css"
import Left from '../../components/leftContainer/Left'
import Right from '../../components/rightContainer/Right'

const Home = () => {
  return (
    <div className='main_container'>
      <Left/>
      <Right/>
    </div>
  )
}

export default Home