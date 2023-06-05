import React from 'react'
import "./singleconvo.css"

const SingleConvo = (props) => {
  return (
    <div className='singleconvo_container'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"/>
          <h3>{props.name}</h3>
    </div>
  )
}

export default SingleConvo