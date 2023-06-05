import React from 'react'
import"./inputsection.css"
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';


const InputSection = () => {
  return (
    <div className='input_container'>
      <div className='input_box'>
             <input type="text" placeholder='Type a message'/>
             
             <div className='send'>
                <SendIcon/>
             </div>
      </div>
      <label htmlFor="file" className='attachfile'>
        <AttachFileIcon className='attachicon'/>
      </label>
      <input style={{display:"none"}} id="file" type="file"/>
      
          
    </div>
  )
}

export default InputSection