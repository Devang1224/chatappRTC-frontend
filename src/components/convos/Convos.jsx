import React, { useCallback, useContext, useEffect, useState } from "react";
import "./convos.css";
import SingleConvo from "../SingleConvo/SingleConvo";
import { userContext } from "../../contextApi/Usercontext";
import { userRequest } from "../../ApiCalls";


const Convos = () => {
  // const [convos, setConvos] = useState([]);
  const {data,dispatch} = useContext(userContext);

 const fetchConvos = async () => {
      try {
        // const res = await userRequest.get(`/chat/${data.UserId}`);
        // if(res.status === 200) {
        console.log(data.UserId);
 
          //  dispatch({ type: "SAVE_CONVOS", payload: res.data });
        // }

  
      } catch (err) {
        console.log(err);
      }
    }
  

  // useEffect(() => {

    fetchConvos();

  // }, []);


  return (
    <div className="convos_container">
      {/* { convos.length==0
      ?
      <div style={{height:"100%",display:"flex",alignItems:"center"}}>
        <p style={{color:"rgba(0,0,0,0.4)"}}>You have no conversations yet</p>
      </div>
      :
        convos.map((item)=><SingleConvo name={item.receiverData.receiverName} id={item.receiverData.receiverId} key={item.receiverData.receiverId}/>)
      
      } */}
      <button onClick={() => fetchConvos()}>Call Function</button>

    </div>
  );
};

export default Convos;
