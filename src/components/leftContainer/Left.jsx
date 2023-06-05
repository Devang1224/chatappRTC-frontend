import React from 'react'
import "./left.css"
import Topbar from '../topBar/Topbar'
import Search from '../searchBar/Search'
import Convos from '../convos/Convos'

const Left = () => {
  return (
    <div className='left_container'>
      <Topbar/>
      <Search/>
      <Convos/>
    </div>
  )
}

export default Left